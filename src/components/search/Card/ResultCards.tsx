import { getPathLists } from '@/utils/apis/path';
import { pathResultState } from '@/recoil/search';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { IQueryProps } from '@/type/search';
import ResultCard from './ResultCard';

const ResultCards = () => {
  const pathResult = useRecoilValue(pathResultState);

  const queryKey = [
    'userRoute',
    pathResult.departure.x,
    pathResult.departure.y,
    pathResult.arrival.x,
    pathResult.arrival.y,
  ];

  const { data, isLoading, isError } = useQuery<IQueryProps>({
    queryKey: queryKey,
    queryFn: () =>
      getPathLists({
        sx: pathResult.departure.x,
        sy: pathResult.departure.y,
        ex: pathResult.arrival.x,
        ey: pathResult.arrival.y,
      }),
  });

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <>
      {data &&
        data?.route?.map(
          (
            { type, totalTime, totalDistance, subPath, lastBoardingTime },
            index
          ) => {
            return (
              <div key={index}>
                <ResultCard
                  type={type}
                  totalTime={totalTime}
                  totalDistance={totalDistance}
                  subPath={subPath}
                  lastBoardingTime={lastBoardingTime}
                  index={index}
                />
              </div>
            );
          }
        )}
    </>
  );
};

export default ResultCards;
