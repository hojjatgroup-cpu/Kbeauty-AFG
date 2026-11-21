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
  // product types
  cleanser: (
    <>
      <path d="M9 9h6l1 2v8.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 19.5V11l1-2Z" />
      <path d="M10.5 9V6.5h3V9M13.5 6.5h3" />
      <circle cx="18.5" cy="4" r="1" />
      <circle cx="20.5" cy="7" r=".7" />
      <path d="M8 14h8" />
    </>
  ),
  toner: (
    <>
      <path d="M9.5 3.5h5V7h-5z" />
      <path d="M8 7h8a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V8a1 1 0 0 1 1-1Z" />
      <path d="M12 11.5c1.2 1.4 1.8 2.4 1.8 3.2a1.8 1.8 0 0 1-3.6 0c0-.8.6-1.8 1.8-3.2Z" />
    </>
  ),
  serum: (
    <>
      <path d="M10.5 2.5h3v3.5h-3z" />
      <path d="M9.5 6h5v2h-5z" />
      <path d="M8.5 8h7a1 1 0 0 1 1 1v10.5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1Z" />
      <path d="M7.5 13h9" />
    </>
  ),
  cream: (
    <>
      <path d="M5 10h14v8a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18v-8Z" />
      <path d="M4 7.5h16V10H4z" />
      <path d="M9 4.5c1.5-1 4.5-1 6 0" />
      <path d="M8.5 14.5h7" />
    </>
  ),
  sunscreen: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  mask: (
    <>
      <path d="M12 3c-4 0-7 3-7 8 0 5.5 3.2 10 7 10s7-4.5 7-10c0-5-3-8-7-8Z" />
      <path d="M8.5 10.5h2M13.5 10.5h2M10 16c1.2.8 2.8.8 4 0" />
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
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  );
}
