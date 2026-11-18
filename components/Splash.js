"use client";

import { useEffect, useState } from "react";

// Loading screen with the spinning star. Hides as soon as the page is ready to use
// (does not wait for images or the video), at most ~1.5 seconds.
export default function Splash() {
  const [state, setState] = useState("show"); // show -> hide -> gone

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setState("hide");
      setTimeout(() => setState("gone"), 500);
    };
    const min = setTimeout(() => {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(finish, finish);
      else finish();
    }, 500);
    const max = setTimeout(finish, 1500);
    return () => {
      clearTimeout(min);
      clearTimeout(max);
    };
  }, []);

  if (state === "gone") return null;
  return (
    <div className={`splash ${state === "hide" ? "splash-hide" : ""}`} aria-hidden="true">
      <img src="/star.png" alt="" width="64" height="64" className="splash-star" />
    </div>
  );
}
