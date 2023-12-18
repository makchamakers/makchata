import { getPathLists } from '@/utils/apis/path';
import { pathResultState } from '@/recoil/search';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { IQueryProps } from '@/type/search';
import ResultCard from './ResultCard';
import CloseError from '../CloseError';
import icLoading from 'public/assets/icons/ic_loading.gif';
import Image from 'next/image';
import styled from 'styled-components';

const ResultCards = () => {
  const pathResult = useRecoilValue(pathResultState);

  const queryKey = [
    'userRoute',
    pathResult.departure.x,
    pathResult.departure.y,
    pathResult.arrival.x,
    pathResult.arrival.y,
  ];

  const { data, isLoading } = useQuery<IQueryProps | string>({
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
    return (
      <LoadingWrap>
        <Image
          src={icLoading}
          alt="로딩중입니다."
          width={150}
          height={150}
        ></Image>
      </LoadingWrap>
    );
  }

  return (
    <>
      {data &&
        (typeof data === 'string' ? (
          <CloseError />
        ) : (
          data?.route?.map(
            (
              { type, totalTime, totalDistance, subPath, lastBoardingTime },
              index
            ) => {
              return (
                <div key={index}>
                  {typeof data !== 'string' && (
                    <ResultCard
                      type={type}
                      totalTime={totalTime}
                      totalDistance={totalDistance}
                      subPath={subPath}
                      lastBoardingTime={lastBoardingTime}
                      index={index}
                    />
                  )}
                </div>
              );
            }
          )
        ))}
    </>
  );
};

export default ResultCards;

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
