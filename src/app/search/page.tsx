'use client';

import { getCurrentLocation } from '@/api/api';
import { ChipButton, PlaceCard } from '@/components/search';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  arrivalAddressesState,
  departureAddressesState,
} from '@/recoil/search';
import DepartureInput from '@/components/search/Input/DepartureInput';
import ArrivalInput from '@/components/search/Input/ArrivalInput';

// TODO: 컴포넌트 분리
export default function SearchPage() {
  const [coords, setCoords] = useState({
    latitude: '',
    longitude: '',
  });
  const [currentPosition, setCurrentPosition] = useState<{
    location: string;
  }>();
  const departureAddresses = useRecoilValue(departureAddressesState);
  console.log(departureAddresses, 'page');
  const arrivalAddresses = useRecoilValue(arrivalAddressesState);

  //상대방의 동의를 구하고 현재 위치를 구해야한다.
  useEffect(() => {
    const { geolocation } = navigator;
    let latitude = '';
    let longitude = '';

    geolocation.getCurrentPosition(async (position) => {
      setCoords({
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
      });

      latitude = position.coords.latitude.toString();
      longitude = position.coords.longitude.toString();
      await getCurrentLocation(latitude, longitude).then(
        (res: { location: string }) => {
          setCurrentPosition(res);
        }
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureAddresses, arrivalAddresses]);

  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          {/* defaultLocation={currentPosition?.location || ''} */}
          <DepartureInput />
          <ArrivalInput />
        </div>
        <ResetBox>
          <XSVG />
        </ResetBox>
      </Header>
      <ButtonWrap>
        <article>
          {/* TODO: ICON SVG, onClick 수정 */}
          <ChipButton text="우리집" onClick={() => console.log('hi')} />
          <ChipButton text="회사" onClick={() => console.log('hi')} />
          <ChipButton text="헬스장" onClick={() => console.log('hi')} />
        </article>
        {/* TODO: 즐겨찾기 스타일, onClick 수정 */}
        <ChipButton text="장소 즐겨찾기" onClick={() => console.log('hi')} />
      </ButtonWrap>
      {Array.isArray(departureAddresses) &&
        departureAddresses.length > 0 &&
        departureAddresses.map(({ address_name, place_name, x, y }, index) => {
          return (
            <PlaceCard
              key={index}
              address={address_name}
              detailAddress={place_name}
              x={x}
              y={y}
              type={'departure'}
            />
          );
        })}
      {Array.isArray(arrivalAddresses) &&
        arrivalAddresses.length > 0 &&
        arrivalAddresses.map(({ address_name, place_name, x, y }, index) => (
          <PlaceCard
            key={index}
            address={address_name}
            detailAddress={place_name}
            x={x}
            y={y}
            type={'arrival'}
          />
        ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 151px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const ResetBox = styled.div`
  height: 89px;
  padding-top: 13px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  background-color: #c7c7e8;
  display: inline-flex;
  padding: 10px 16px;
  align-items: flex-start;
  gap: 63px;

  > article {
    width: 197px;
    gap: 8px;
    display: flex;
  }
`;
