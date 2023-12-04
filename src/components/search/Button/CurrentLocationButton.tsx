import React from 'react';
import styled from 'styled-components';
import icCurrentLocation from 'public/assets/icons/ic_current_location.png';
import { pathResultState, searchState } from '@/recoil/search';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { getCurrentLocation } from '@/utils/apis/path';

const CurrentLocationButton = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchState);
  const [pathResult, setPathResult] = useRecoilState(pathResultState);

  const onClickCurrentLocation = () => {
    const { geolocation } = navigator;
    let latitude = '';
    let longitude = '';
    geolocation.getCurrentPosition(async (position) => {
      latitude = position.coords.latitude.toString();
      longitude = position.coords.longitude.toString();
      await getCurrentLocation(latitude, longitude).then((res) => {
        setSearchValue({ ...searchValue, departure: res.location });
        setPathResult({
          ...pathResult,
          departure: {
            address: res.location,
            location: res.location,
            x: res.x,
            y: res.y,
          },
        });
      });
    });
  };

  return (
    <Button onClick={() => onClickCurrentLocation()}>
      <Image src={icCurrentLocation} alt="현재위치버튼" />
    </Button>
  );
};

export default CurrentLocationButton;

const Button = styled.button`
  position: absolute;
  right: 7%;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
