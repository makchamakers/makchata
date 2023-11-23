import { PathDetailRequestProps } from '@/type/path';

// 이동경로 상세 조회
export const getPathDetail = async ({
  sx,
  sy,
  ex,
  ey,
  index,
}: PathDetailRequestProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/destination/${index}?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
