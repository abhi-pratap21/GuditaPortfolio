"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/* Gudita's local time. Rendered after mount so server and client markup match. */
export default function Clock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}
