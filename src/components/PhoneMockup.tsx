"use client";
import PhoneFrame from "./PhoneFrame";

export default function PhoneMockup() {
  return (
    <PhoneFrame
      src="/feed.PNG"
      alt="GroovX feed"
      width={268}
      height={552}
      className="fu"
      style={{ transitionDelay: "200ms" }}
    />
  );
}
