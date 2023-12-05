'use client';
import styled from 'styled-components';
import icLocation from 'public/assets/icons/ic_location.svg';
import Image from 'next/image';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addressesState, pathResultState, searchState } from '@/recoil/search';
import { IPlaceCard } from '@/type/search';
import { useState } from 'react';

const PlaceCard = ({ location, address, x, y, type }: IPlaceCard) => {
  const [path, setPath] = useRecoilState(pathResultState);
  const resetAddress = useResetRecoilState(addressesState);
  const [search, setSearch] = useRecoilState(searchState);
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchEvent = () => {
    setIsPressed(!isPressed);
  };

  const saveAddress = () => {
    if (type === 'departure') {
      setPath({ ...path, departure: { address, location, x, y } });
      setSearch({ ...search, departure: location });
      resetAddress();
      return;
    } else if (type === 'arrival') {
      setPath({ ...path, arrival: { address, location, x, y } });
      setSearch({ ...search, arrival: location });
      resetAddress();
      return;
    }
  };

  return (
    <Container
      $isPressed={isPressed}
      onTouchStart={() => {
        handleTouchEvent();
      }}
      onTouchEnd={() => {
        saveAddress();
        handleTouchEvent();
      }}
      onClick={saveAddress}
    >
      <Wrap>
        <Image src={icLocation} alt="위치 이미지" />
        <TitleWrap>
          <p>{location}</p>
          <p>{address}</p>
        </TitleWrap>
      </Wrap>
    </Container>
  );
};

export default PlaceCard;

const Container = styled.div<{ $isPressed: boolean }>`
  cursor: pointer;
  background: ${({ $isPressed }) =>
    $isPressed ? 'var(--Gray_eeeeee, #eee)' : 'white'};
  border: none;
  &:hover {
    background-color: var(--Gray_eeeeee, #eee);
  }
`;

const Wrap = styled.article`
  display: flex;
  grid-template-columns: 18px 1fr 18px;
  align-items: center;
  gap: 16px;
  padding: 16px 8px;
  border-bottom: 1px solid #eee;
`;

const TitleWrap = styled.div`
  font-size: 14px;

  > p:first-of-type {
    font-weight: 600;
    margin-bottom: 8px;
    text-align: left;
  }

  > p:last-of-type {
    color: var(--Gray_888888, #888);
    font-weight: 400;
    text-align: left;
  }
`;
