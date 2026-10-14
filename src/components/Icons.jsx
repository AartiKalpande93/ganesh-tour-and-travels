const paths = {
  yatra: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  group: (
    <>
      <circle cx="8" cy="9" r="2.1" />
      <circle cx="16" cy="9" r="2.1" />
      <path strokeLinecap="round" d="M3.8 18.5c.5-2.4 2.2-3.8 4.2-3.8s3.7 1.4 4.2 3.8M12.2 14.8c1.7.2 3.1 1.4 3.6 3.7" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="8" r="2" />
      <circle cx="15.5" cy="8.6" r="1.6" />
      <circle cx="12.2" cy="6.2" r="1.3" />
      <path strokeLinecap="round" d="M3.6 18.2c.4-2.3 2.1-3.7 4.4-3.7s4 1.4 4.4 3.7M13 14.8c1.5.2 2.8 1.3 3.2 3.4" />
    </>
  ),
  temple: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 14.2 7H9.8L12 3.5zM6.5 20.5V10h11v10.5M4.5 20.5h15M12 10v10.5M9.2 14.5h5.6" />
  ),
  day: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 3.5v1.8M12 18.7v1.8M3.5 12h1.8M18.7 12h1.8M6 6l1.3 1.3M16.7 16.7 18 18M18 6l-1.3 1.3M7.3 16.7 6 18" />
    </>
  ),
  route: (
    <>
      <circle cx="6.5" cy="7" r="2" />
      <circle cx="17.5" cy="17" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.4 8.2C10 11 11 12.2 12 13s2.2 1.6 5.2 2.6" />
    </>
  ),
  custom: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5h9.5M14.5 5.5 17 7.5 14.5 9.5M19 16.5H9.5M9.5 14.5 7 16.5 9.5 18.5" />
  ),
  bus: (
    <>
      <rect x="4" y="6" width="16" height="10" rx="2" />
      <path strokeLinecap="round" d="M4 11h16M8 16v2M16 16v2" />
      <circle cx="8" cy="13.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.2" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  hotel: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5h5A1.5 1.5 0 0 1 12 6.5V20M12 10h6.5A1.5 1.5 0 0 1 20 11.5V20M3 20h18M7 8.5h2M7 12h2M15 13.5h2M15 16.5h2" />
  ),
  comfort: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16v3H4zM6 15V9.5A2.5 2.5 0 0 1 8.5 7H11v8M13 15V10h4.2A2.8 2.8 0 0 1 20 12.8V15" />
  ),
  plan: (
    <>
      <rect x="4.5" y="5" width="15" height="14" rx="2" />
      <path strokeLinecap="round" d="M8 3.8v2.4M16 3.8v2.4M4.5 9h15M8.5 13h3M8.5 16h5" />
    </>
  ),
  trust: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 18.5 6v5.2c0 4.2-2.6 6.9-6.5 8.3-3.9-1.4-6.5-4.1-6.5-8.3V6L12 3.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="8" r="2.2" />
      <path strokeLinecap="round" d="M7.2 18.2c.6-2.5 2.4-3.9 4.8-3.9s4.2 1.4 4.8 3.9" />
    </>
  ),
  price: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M8.5 8.2c.6-1.2 1.8-2 3.6-2 2.2 0 3.6 1.2 3.6 2.8 0 3.6-7.2 2.2-7.2 5.6 0 1.6 1.5 2.8 3.7 2.8 1.8 0 3.1-.8 3.7-2" />
  ),
  support: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.5a5 5 0 0 1 10 0" />
      <rect x="4.5" y="11" width="3.2" height="5" rx="1" />
      <rect x="16.3" y="11" width="3.2" height="5" rx="1" />
      <path strokeLinecap="round" d="M16.5 16.2v.6A2.2 2.2 0 0 1 14.3 19H12" />
    </>
  ),
  memory: (
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 4 1.7 3.6 3.9.5-2.9 2.6.8 3.8L12 12.6 8.5 14.5l.8-3.8L6.4 8.1l3.9-.5L12 4z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="12" fill="#0866ff" stroke="none" />
      <path
        d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13h2.8v8h3.5z"
        fill="#000"
        stroke="none"
      />
    </>
  ),
  phone: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.8h2.6l1.2 3.2-1.7 1a11 11 0 0 0 5.9 5.9l1-1.7 3.2 1.2V16a1.6 1.6 0 0 1-1.6 1.6A13.6 13.6 0 0 1 5.4 5.4 1.6 1.6 0 0 1 7 3.8z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 7.5 7.5 6 7.5-6" />
    </>
  ),
  pin: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6.2-5.4 6.2-10a6.2 6.2 0 1 0-12.4 0c0 4.6 6.2 10 6.2 10z" />
      <circle cx="12" cy="11" r="1.8" />
    </>
  ),
  arrow: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  ),
};

export function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {paths[name] || paths.yatra}
    </svg>
  );
}
