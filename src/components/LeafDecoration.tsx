import React from 'react';

interface LeafDecorationProps {
  className?: string;
  size?: number;
  color?: string;
  ariaHidden?: boolean;
}

const LeafDecoration = ({ className = '', size = 120, color = 'var(--tertiary)', ariaHidden = true }: LeafDecorationProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    color,
  };

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaHidden ? 'img' : undefined}
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id="leafGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(71,120,5,0.12)" />
          <stop offset="100%" stopColor="rgba(55,85,52,0.18)" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M20 120 C40 20, 160 20, 180 120 C160 110, 40 110, 20 120 Z" fill="url(#leafGrad)" opacity="0.95" />
        <path d="M50 80 C70 60, 130 60, 150 80" stroke="currentColor" strokeWidth={6} strokeOpacity={0.18} strokeLinecap="round" />
        <path d="M60 100 C80 88, 120 88, 140 100" stroke="currentColor" strokeWidth={4} strokeOpacity={0.12} strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default LeafDecoration;
