import React from 'react';

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 4 6 6-6 6"
    />
  </svg>
);

export default ArrowIcon;
