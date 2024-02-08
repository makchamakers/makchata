import { PathAllRequestProps, PathDetailRequestProps } from '@/type/path';

// 현재위치 조회
export const getCurrentLocation = async (
  latitude: string,
  longitude: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}?latitude=${latitude}&longitude=${longitude}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// 장소검색결과 조회
export const getLocationSearchResults = async (search: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search?search=${search}`,
      {
        cache: 'force-cache',
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param sx 출발지 x좌표
 * @param sy 출발지 y좌표
 * @param ex 목적지 x좌표
 * @param ey 목적지 y좌표
 */

// 이동경로 목록 조회
export const getPathLists = async ({ sx, sy, ex, ey }: PathAllRequestProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/destination?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

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
