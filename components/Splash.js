"use client";

import { useEffect, useState } from "react";

// Loading screen with the spinning star from the logo. Fades out once the page has loaded.
export default function Splash() {
  const [state, setState] = useState("show"); // show -> hide -> gone

  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const wait = Math.max(0, 700 - (Date.now() - start));
      setTimeout(() => {
        setState("hide");
        setTimeout(() => setState("gone"), 500);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (state === "gone") return null;
  return (
    <div className={`splash ${state === "hide" ? "splash-hide" : ""}`} aria-hidden="true">
      <img src="/star.png" alt="" width="64" height="64" className="splash-star" />
    </div>
  );
}
