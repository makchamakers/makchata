export const getCurrentLoaction = async (
  latitude: string,
  longitude: string
) => {
  const res = await fetch(
    `http://localhost:8080?latitude=${latitude}&longitude=${longitude}`
  );
  return res.json();
};
