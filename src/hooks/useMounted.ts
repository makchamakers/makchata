import { useEffect, useState } from 'react';

// hydration matching 에러를 해결하기 위한 hook
// mounted 된 이후에 상태를 업데이트 하기 위함.
export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};
