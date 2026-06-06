import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();

  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Supabase spots error:", error);
    return NextResponse.json({ count: 0, total: 100 });
  }

  return NextResponse.json({ count: count ?? 0, total: 100 });
}
