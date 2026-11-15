import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#ECEFF4] via-[#E2E8F0] to-[#DBEAFE] text-[#334155] p-6 text-center ${className}`}
      >
        <Layers className="w-7 h-7 text-[#2563EB] mb-2" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-[#0D1017] max-w-xs">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
