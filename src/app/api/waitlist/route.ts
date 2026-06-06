import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = createServerClient();

  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  const proLocked = (count ?? 0) < 100;

  const { error: insertError } = await supabase
    .from("waitlist")
    .insert({ email, pro_locked: proLocked });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }
    console.error("Supabase insert error:", insertError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "GroovX <noreply@groovx.app>",
      to: email,
      subject: proLocked ? "You're in — Pro free forever 🎉" : "You're on the GroovX waitlist",
      html: proLocked
        ? `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#0D1117;color:#F0F6FC">
            <h1 style="font-size:24px;font-weight:800;color:#2DD4BF;margin-bottom:8px">You're in the first 100 🎉</h1>
            <p style="color:#8B949E;line-height:1.7;margin-bottom:24px">You've locked in <strong style="color:#F0F6FC">Pro — free forever</strong>. No credit card. No expiry. Just Pro, on us.</p>
            <p style="color:#8B949E;line-height:1.7;margin-bottom:32px">We'll email you the moment GroovX launches.</p>
            <p style="color:#484F58;font-size:13px">— The GroovX Team</p>
           </div>`
        : `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#0D1117;color:#F0F6FC">
            <h1 style="font-size:24px;font-weight:800;color:#2DD4BF;margin-bottom:8px">You're on the waitlist</h1>
            <p style="color:#8B949E;line-height:1.7;margin-bottom:24px">The first 100 Pro spots are taken, but you're on the list. We'll be in touch when GroovX launches.</p>
            <p style="color:#484F58;font-size:13px">— The GroovX Team</p>
           </div>`,
    });
  } catch (e) {
    console.error("Resend error:", e);
  }

  return NextResponse.json({ ok: true, proLocked });
}
