'use client';

import Image from 'next/image';
import { styled } from 'styled-components';
import icCharDefault from 'public/assets/icons/ic_char_default.svg';
import { useState } from 'react';
import Link from 'next/link';
import { ITaxiFareProps } from '@/type/search';
import { useQuery } from '@tanstack/react-query';
import { getTaxiFare } from '@/utils/apis/finish';
import { useRecoilValue } from 'recoil';
import { pathResultState } from '@/recoil/search';

export default function finish() {
  const [isCheckedBefore, setIsCheckedBefore] = useState(true);
  const [isDoneSuccess, setIsDoneSuccess] = useState(false);
  const pathResult = useRecoilValue(pathResultState);

  const CheckSuccessHandler = (state: boolean): void => {
    setIsCheckedBefore(false);
    setIsDoneSuccess(state);
  };
  const querykey = [
    'useTaxiFare',
    pathResult.departure.x,
    pathResult.departure.y,
    pathResult.arrival.x,
    pathResult.arrival.y,
  ];

  const { data, isLoading, isError } = useQuery<ITaxiFareProps>({
    queryKey: querykey,
    queryFn: () =>
      getTaxiFare({
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
    <Container>
      <TextArea>
        {isCheckedBefore === true ? (
          <p>
            <b>막차</b>타고 집에 잘 도착했나요?
          </p>
        ) : isDoneSuccess ? (
          <p>
            오늘 내가 아낀 예상 택시비는
            <br />
            <b>{data?.taxiPay}원</b>이에요
          </p>
        ) : (
          <p>
            {' '}
            저런...! 오늘 내가 내야하는 예상 택시비는
            <br />
            <b>40,200원</b>이에요
          </p>
        )}
      </TextArea>
      <Image
        src={icCharDefault}
        width={110}
        height={96}
        alt="막차타일러스트"
        priority
      />
      <ButtonArea>
        {isCheckedBefore ? (
          <ButtonWrapper>
            <button
              onClick={() => CheckSuccessHandler(true)}
              className="highlight"
            >
              네 도착했어요!
            </button>
            <button onClick={() => CheckSuccessHandler(false)}>아니요</button>
          </ButtonWrapper>
        ) : isDoneSuccess ? (
          <Link href="/" className="highlight">
            내 통장을 지켜줘서 고마워
          </Link>
        ) : (
          <Link href="/" className="highlight">
            내 통장아 미안해
          </Link>
        )}
      </ButtonArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextArea = styled.div`
  width: 100%;
  height: 74px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 42px;
`;
const ButtonArea = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-top: 88px;
  & button,
  a {
    display: inline-block;
    width: 100%;
    background-color: #fff;
    border: 1px solid #888;
    border-radius: 14px;
    padding: 13px 0;
    text-align: center;
  }
  & .highlight,
  a {
    background-color: #ff8048;
    color: #fff;
    border: none;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;

  & button {
    width: 50%;
  }
`;
