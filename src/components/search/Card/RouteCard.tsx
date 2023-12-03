'use client';

import styled from 'styled-components';
import icX from 'public/assets/icons/ic_x_sm.png';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pathResultState, remainPathState } from '@/recoil/search';

const RouteCard = () => {
  const remainPath = useRecoilValue(remainPathState);
  const pathResult = useSetRecoilState(pathResultState);

  return (
    <>
      {remainPath?.map(({ arrival, departure }) => {
        const showResult = () => {
          pathResult({
            arrival: {
              location: arrival.location,
              address: arrival.address,
              x: arrival.x,
              y: arrival.y,
            },
            departure: {
              location: departure.location,
              address: departure.address,
              x: departure.x,
              y: departure.y,
            },
          });
        };
        return (
          <Container key={arrival.x} onClick={() => showResult()}>
            <Wrap>
              <Course>
                <p>
                  <span>출발지</span> {departure.location}
                </p>
                <p>
                  <span>도착지</span> {arrival.location}
                </p>
              </Course>
              <Image src={icX} alt="저장된 경로 삭제" />
            </Wrap>
          </Container>
        );
      })}
    </>
  );
};
export default RouteCard;

const Container = styled.div`
  color: inherit;
  border: none;
  background: none;
  cursor: pointer;
`;

const Wrap = styled.article`
  width: 100%;
  padding: 16px 24px;
  margin-bottom: 6px;
  gap: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 14px;
  background: var(--Gray_f9f9f9, #f9f9f9);
`;

const Course = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  p {
    text-align: left;
  }
  span {
    font-weight: 600;
    padding-right: 10px;
  }
`;
