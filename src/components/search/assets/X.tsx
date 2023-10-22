interface IX {
  size?: string;
}

const X = ({ size }: IX) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '18'}
      height={size || '18'}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M17 1L1 17"
        stroke="#888888"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 17L1 0.999999"
        stroke="#888888"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default X;
