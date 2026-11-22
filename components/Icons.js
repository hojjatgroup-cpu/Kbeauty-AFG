// Thin line icons in the site's style (stroke = currentColor)
const P = {
  // trust row
  original: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.4-4.6" />
    </>
  ),
  delivery: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h3.6l2.9 3v3H14" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="17" cy="17.5" r="1.7" />
    </>
  ),
  consult: (
    <>
      <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1.1 0-2.1-.2-3-.5L4.5 20l1.2-3.4C4.6 15.5 4 14 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
      <path d="M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01" strokeWidth="2.2" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="3.5" height="5.5" rx="1.5" />
      <rect x="17" y="13" width="3.5" height="5.5" rx="1.5" />
      <path d="M19 18.5c0 1.4-1.6 2.5-4.5 2.5H12" />
    </>
  ),
  // product types (duotone line icons)
  cleanser: (
    <>
      <path d="M9.2 8.5h5.6l.9 2.2v9a1.8 1.8 0 0 1-1.8 1.8H10a1.8 1.8 0 0 1-1.8-1.8v-9l1-2.2Z" fill="currentColor" fillOpacity=".14" />
      <path d="M10.6 8.5V6.6h2.8v1.9" />
      <path d="M11.2 6.6V4.3h4.3" />
      <path d="M15.5 4.3v1.2" />
      <path d="M8.2 13.2h7.6" />
      <circle cx="18.6" cy="7.6" r="1.1" />
      <circle cx="19.9" cy="10.6" r=".7" />
      <circle cx="17.6" cy="10.2" r=".45" />
    </>
  ),
  toner: (
    <>
      <rect x="9.6" y="2.8" width="4.8" height="3.4" rx=".8" />
      <path d="M8.3 6.2h7.4a1.3 1.3 0 0 1 1.3 1.3v12.2a1.8 1.8 0 0 1-1.8 1.8H8.8A1.8 1.8 0 0 1 7 19.7V7.5a1.3 1.3 0 0 1 1.3-1.3Z" fill="currentColor" fillOpacity=".14" />
      <path d="M7 10.2h10M7 17.4h10" />
      <path d="M12 11.9c.95 1.1 1.45 1.95 1.45 2.6a1.45 1.45 0 0 1-2.9 0c0-.65.5-1.5 1.45-2.6Z" />
    </>
  ),
  serum: (
    <>
      <path d="M10.4 2.6c0-.5.4-.8.8-.8h1.6c.4 0 .8.3.8.8v3.2h-3.2V2.6Z" fill="currentColor" fillOpacity=".14" />
      <path d="M9.6 5.8h4.8v2H9.6z" />
      <path d="M12 7.8v6.6" />
      <path d="M8.6 9.4h6.8a1.6 1.6 0 0 1 1.6 1.6v8.4a2.4 2.4 0 0 1-2.4 2.4H9.4A2.4 2.4 0 0 1 7 19.4V11a1.6 1.6 0 0 1 1.6-1.6Z" fill="currentColor" fillOpacity=".14" />
      <path d="M12 14.4c.7.8 1 1.4 1 1.9a1 1 0 0 1-2 0c0-.5.3-1.1 1-1.9Z" />
    </>
  ),
  cream: (
    <>
      <path d="M4.6 11.2h14.8v6.6a3 3 0 0 1-3 3H7.6a3 3 0 0 1-3-3v-6.6Z" fill="currentColor" fillOpacity=".14" />
      <rect x="3.8" y="8" width="16.4" height="3.2" rx="1.2" />
      <path d="M7.4 8c.4-2.4 2.3-3.6 4.6-3.6s4.2 1.2 4.6 3.6" />
      <path d="M10.6 5.3c.6-.8 1.7-.9 2.4-.2" />
      <path d="M8 15.2h8" />
    </>
  ),
  sunscreen: (
    <>
      <path d="M8.4 3.2h7.2l-.6 13.3a1.6 1.6 0 0 1-1.6 1.5h-2.8a1.6 1.6 0 0 1-1.6-1.5L8.4 3.2Z" fill="currentColor" fillOpacity=".14" />
      <rect x="9.8" y="18" width="4.4" height="3" rx=".8" />
      <circle cx="12" cy="9.6" r="2" />
      <path d="M12 6v.8M12 12.4v.8M8.9 9.6h.8M14.3 9.6h.8" />
      <path d="M18.4 5.2l1.2-1.2M19.6 9.6h1.6M18.4 14l1.2 1.2" />
    </>
  ),
  mask: (
    <>
      <path d="M12 2.8c-4.2 0-7 3.2-7 8 0 5.6 3.4 10.4 7 10.4s7-4.8 7-10.4c0-4.8-2.8-8-7-8Z" fill="currentColor" fillOpacity=".14" />
      <path d="M8.2 10.4c.6-.5 1.6-.5 2.2 0M13.6 10.4c.6-.5 1.6-.5 2.2 0" />
      <path d="M12 12v2.2" />
      <path d="M10 16.6c1.2.8 2.8.8 4 0" />
    </>
  ),
  hair: (
    <>
      <path d="M5 21v-6.5C5 9 8 4 12 4s7 5 7 10.5V21" fill="currentColor" fillOpacity=".14" />
      <path d="M9 21v-7c0-2.4 1.3-4.6 3-5.6 1.7 1 3 3.2 3 5.6v7" />
      <path d="M12 8.4V21" />
      <path d="M6.6 7.4C8 5.4 9.8 4.4 12 4.4" />
    </>
  ),
  body: (
    <>
      <rect x="9.6" y="2.6" width="4.8" height="2.6" rx=".7" />
      <path d="M10.4 5.2h3.2v1.6" />
      <path d="M8.6 6.8h6.8a1.6 1.6 0 0 1 1.6 1.6v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-11a1.6 1.6 0 0 1 1.6-1.6Z" fill="currentColor" fillOpacity=".14" />
      <path d="M16.6 3.4l2.4-.9M16.8 4.6l2.6.2M16.6 5.8l2.2 1.1" />
      <path d="M10 13.6c.5-1.3 3.5-1.3 4 0-.5 1.3-3.5 1.3-4 0Z" />
    </>
  ),
};

export default function Icon({ name, size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  );
}
