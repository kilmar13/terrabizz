import React from 'react';

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tb-left" x1="50" y1="90" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a5369" />
          <stop offset="1" stopColor="#042a3a" />
        </linearGradient>
        <linearGradient id="tb-right" x1="150" y1="90" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#30b455" />
          <stop offset="1" stopColor="#19823b" />
        </linearGradient>
        <linearGradient id="tb-top" x1="30" y1="40" x2="170" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c829e" />
          <stop offset="1" stopColor="#3eb95c" />
        </linearGradient>
      </defs>
      
      {/* Top T-bar */}
      <path 
        d="M30 40 L170 40 Q170 65 145 75 L115 75 L115 110 L85 110 L85 75 L55 75 Q30 65 30 40 Z" 
        fill="url(#tb-top)" 
      />
      
      {/* Bottom left shield part */}
      <path 
        d="M50 90 L85 110 L100 160 L100 160 L50 125 Z" 
        fill="url(#tb-left)" 
      />

      {/* Bottom right shield part */}
      <path 
        d="M150 90 L115 110 L100 160 L100 160 L150 125 Z" 
        fill="url(#tb-right)" 
      />
    </svg>
  );
}
