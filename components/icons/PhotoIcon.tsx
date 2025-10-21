import React from 'react';

export const PhotoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.083 3.003A3.003 3.003 0 0 0 3 6.006v11.988A3.003 3.003 0 0 0 6.006 21h11.988A3.003 3.003 0 0 0 21 17.994V6.006A3.003 3.003 0 0 0 17.994 3H6.083zM17.25 4.5a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5h-1.5v-1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.003 8.332 7.87 11.42a3 3 0 0 0 3.262 0l4.02-2.545a3 3 0 0 1 3.26 0l3.58 2.26" />
    </svg>
);