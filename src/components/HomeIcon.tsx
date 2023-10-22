import React from 'react';

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || '#BBBBBB'}
      d="M14.571 2.397a1 1 0 0 0-1.142 0l-11 7.652A1 1 0 0 0 2 10.87V25a1 1 0 0 0 1 1h6.625a1 1 0 0 0 1-1v-5.652a1 1 0 0 1 1-1h4.75a1 1 0 0 1 1 1V25a1 1 0 0 0 1 1H25a1 1 0 0 0 1-1V10.87a1 1 0 0 0-.429-.82l-11-7.653Z"
    />
  </svg>
);

export default HomeIcon;
