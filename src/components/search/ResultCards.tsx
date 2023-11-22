import { getUserRoute } from '@/api/api';
import { pathResultState } from '@/recoil/search';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ResultCard } from '.';
import { IQueryProps } from '@/type/search';

const ResultCards = () => {
  const pathResult = useRecoilValue(pathResultState);

  const queryKey = [
    'userRoute',
    pathResult.departure.x,
    pathResult.departure.y,
    pathResult.arrival.x,
    pathResult.arrival.y,
  ];

  const { data, isLoading, isError } = useQuery<IQueryProps[]>({
    queryKey: queryKey,
    queryFn: () =>
      getUserRoute(
        pathResult.departure.x,
        pathResult.departure.y,
        pathResult.arrival.x,
        pathResult.arrival.y
      ),
  });

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (isError) {
    return <div>에러입니다.</div>;
  }
  return (
    <>
      {data && data.length > 0
        ? data?.map(({ type, totalTime, totalDistance, subPath }, index) => {
            return (
              <div key={index}>
                <ResultCard
                  type={type}
                  totalTime={totalTime}
                  totalDistance={totalDistance}
                  subPath={subPath}
                  index={index}
                />
              </div>
            );
          })
        : ''}
    </>
  );
};

export default ResultCards;
