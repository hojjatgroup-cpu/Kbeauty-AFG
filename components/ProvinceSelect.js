"use client";

import { useEffect, useRef, useState } from "react";

// Custom dropdown (uses the site font, unlike the phone's native picker).
// options: [{ value, label, note }]
export default function ProvinceSelect({ options, value, onChange, placeholder, invalid }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div className={`pselect ${open ? "open" : ""} ${invalid ? "invalid" : ""}`} ref={ref}>
      <button type="button" className="pselect-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className={selected ? "" : "muted"}>{selected ? selected.label : placeholder}</span>
        {selected?.note && <span className="pselect-note">{selected.note}</span>}
        <span className="pselect-arrow">⌄</span>
      </button>
      {open && (
        <ul className="pselect-list" role="listbox">
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                className={o.value === value ? "on" : ""}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span>{o.label}</span>
                {o.note && <span className="pselect-note">{o.note}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
