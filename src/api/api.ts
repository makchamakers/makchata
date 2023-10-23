export const getCurrentLoaction = async (
  latitude: string,
  longitude: string
) => {
  const res = await fetch(
    `http://localhost:8080?latitude=${latitude}&longitude=${longitude}`
  );
  return res.json();
};

export const getSearchResult = async (search: string, departure: string) => {
  const res = await fetch(
    `http://localhost:8080/search?search=${search}&departure=${departure}`
  );
  return res.json();
};
