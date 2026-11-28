"use client";
import { useEffect, useState, useCallback } from "react";

const KEY = "kbeauty-wish";
const EVT = "kbeauty-wish";

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(read());
    const on = () => setList(read());
    window.addEventListener(EVT, on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener(EVT, on);
      window.removeEventListener("storage", on);
    };
  }, []);
  const toggle = useCallback((slug) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { list, has: (slug) => list.includes(slug), toggle };
}
