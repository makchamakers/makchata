export const getCurrentLocation = async (
  latitude: string,
  longitude: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}?latitude=${latitude}&longitude=${longitude}`
  );
  return res.json();
};

export const getSearchResult = async (search: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search?search=${search}`
    );
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param sx 출발지 x좌표
 * @param sy 출발지 y좌표
 * @param ex 목적지 x좌표
 * @param ey 목적지 y좌표
 * @returns
 */
export const getUserRoute = async (
  sx: string,
  sy: string,
  ex: string,
  ey: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/destination?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`
  );
  return res.json();
};
