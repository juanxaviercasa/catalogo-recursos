/**
 * Archivo editorial: marca geométrica de tres pestañas, sobria y tangible.
 */
type BrandMarkProps = { className?: string };

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#61765B" />
      <path
        d="M4 14C4 11.7909 5.79086 10 8 10H17L21 14H40C42.2091 14 44 15.7909 44 18V36C44 38.2091 42.2091 40 40 40H8C5.79086 40 4 38.2091 4 36V14Z"
        fill="#7A9374"
      />
      <line x1="12" y1="23" x2="36" y2="23" stroke="#F4F0E7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="29" x2="28" y2="29" stroke="#F4F0E7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
