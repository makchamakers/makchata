import { PathAllRequestProps } from '@/type/path';

// 택시비 조회
export const getTaxiFare = async ({ sx, sy, ex, ey }: PathAllRequestProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/taxi?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
