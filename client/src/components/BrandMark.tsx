/**
 * Archivo editorial: marca geométrica de tres pestañas, sobria y tangible.
 */
type BrandMarkProps = { className?: string };

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <img
      className={`brand-mark ${className}`}
      src="/manus-storage/drive-index-logo_cae8f51f.png"
      alt=""
      aria-hidden="true"
    />
  );
}
