import React from 'react';

const PersonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <circle cx={14} cy={7.6} r={5.6} fill={props.color || '#BBBBBB'} />
    <path
      fill={props.color || '#BBBBBB'}
      d="M25.951 25.001c.054.55-.4.999-.953.999H3c-.551 0-1.005-.45-.951-.999C2.599 19.394 7.739 15 14 15c6.26 0 11.4 4.394 11.951 10.001Z"
    />
  </svg>
);

export default PersonIcon;
