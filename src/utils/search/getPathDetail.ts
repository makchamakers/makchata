import { PathDetailRequestProps } from '@/type/path';

export const getPathDetail = async ({
  sx,
  sy,
  ex,
  ey,
  index,
}: PathDetailRequestProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/destination/${index}?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`
  );
  return res.json();
};
