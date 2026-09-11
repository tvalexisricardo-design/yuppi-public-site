export function ProfileImage({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={className} loading="lazy" />;
  return <div role="img" aria-label={alt} className={`flex items-center justify-center bg-violet-light px-6 text-center font-display text-xl text-violet ${className}`}>{alt}</div>;
}
