"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Loading screen with the spinning star.
// On the home page it waits for the background video to be ready (max 4 seconds);
// on other pages it hides as soon as the fonts are ready.
export default function Splash() {
  const pathname = usePathname();
  const [state, setState] = useState("show"); // show -> hide -> gone

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setState("hide");
      setTimeout(() => setState("gone"), 600);
    };
    const isHome = pathname === "/" || pathname === "";
    const timers = [];
    if (isHome) {
      window.addEventListener("hero-video-ready", finish, { once: true });
      timers.push(setTimeout(finish, 4000));
    } else {
      timers.push(
        setTimeout(() => {
          if (document.fonts && document.fonts.ready) document.fonts.ready.then(finish, finish);
          else finish();
        }, 400)
      );
      timers.push(setTimeout(finish, 1500));
    }
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hero-video-ready", finish);
    };
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === "gone") return null;
  return (
    <div className={`splash ${state === "hide" ? "splash-hide" : ""}`} aria-hidden="true">
      <img src="/star.png" alt="" width="64" height="64" className="splash-star" />
    </div>
  );
}
