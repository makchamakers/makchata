import React from 'react';
import styled from 'styled-components';
import CurrentLocationIcon from '../assets/CurrentLocationIcon';
import { pathResultState, searchState } from '@/recoil/search';
import { useRecoilState } from 'recoil';
import { getCurrentLocation } from '@/api/api';

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
            detailAddress: res.location,
            x: res.x,
            y: res.y,
          },
        });
      });
    });
  };

  return (
    <>
      <Button onClick={() => onClickCurrentLocation()}>
        <CurrentLocationIcon />
      </Button>
    </>
  );
};

export default CurrentLocationButton;

const Button = styled.button`
  position: absolute;
  right: 5%;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
