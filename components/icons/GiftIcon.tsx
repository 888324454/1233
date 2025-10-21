import React from 'react';

export const GiftIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.25a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0-15C10.5 5.625 9 7.5 9 7.5s-1.5-1.875-3-3C4.5 3.375 3 4.5 3 4.5m1.5 3.75h15" />
    </svg>
);
