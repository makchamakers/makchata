'use client';

import { getPathDetail } from '@/api/api';
import { PathDetailResponseProps } from '@/type/path';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const temptObj = {
  // recoil pathResultState 값 사용 예정
  departureLongitude: 127.0238072,
  departureLatitude: 37.5190581,
  arrivalLongitude: 126.9522394,
  arrivalLatitude: 37.464007,
  // recoil selectedPathIndexState 값 추가 예정
  index: 1,
};

// 지도 띄우기 함수
const onLoadKakaoAPI = (pathDetailLocations: PathDetailResponseProps[]) => {
  window.kakao.maps.load(() => {
    // 초기 지도화면 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(
        temptObj.departureLatitude,
        temptObj.departureLongitude
      ), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 지도 확대, 축소 이벤트
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      map.getLevel();
    });

    // 다중 마커 표시
    const positions = [
      {
        title: '출발지',
        latlng: new window.kakao.maps.LatLng(
          temptObj.departureLatitude,
          temptObj.departureLongitude
        ),
        src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/blue_b.png',
      },
      {
        title: '도착지',
        latlng: new window.kakao.maps.LatLng(
          temptObj.arrivalLatitude,
          temptObj.arrivalLongitude
        ),
        src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/red_b.png',
      },
    ];

    // 마커 이미지 크기
    const imageSize = new window.kakao.maps.Size(37, 42);

    // 지도 중심좌표 및 범위 재설정
    const bounds = new window.kakao.maps.LatLngBounds();

    for (const position of positions) {
      // 마커 이미지 생성
      const markerImage = new window.kakao.maps.MarkerImage(
        position.src,
        imageSize
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        map, // 마커를 표시할 지도
        position: position.latlng, // 마커를 표시할 위치
        title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
        image: markerImage, // 마커 이미지
      });

      marker.setMap(map);
      bounds.extend(position.latlng);
    }

    map.setBounds(bounds);

    // 지도 경로 표시
    type LinePathsProps = {
      path: string[] | undefined;
      color: string;
    };
    const linePaths: LinePathsProps[] = [];
    const arrayExceptedWalkingPath = pathDetailLocations.filter(
      (path: PathDetailResponseProps) => path.trafficType !== '도보'
    );
    arrayExceptedWalkingPath.map((path) => {
      linePaths.push({
        path: path.coords?.map(
          (coord) => new window.kakao.maps.LatLng(coord.y, coord.x)
          // (coord) => `new window.kakao.maps.LatLng(${coord.y}, ${coord.x})`
        ),
        color: path.trafficType === '버스' ? '#1954b3' : '#ffab24FF',
      });
    });

    linePaths.map((linePath) => {
      const polyline = new window.kakao.maps.Polyline({
        path: linePath.path,
        strokeWeight: 5,
        strokeColor: linePath.color,
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline?.setMap(map);
    });
  });
};

export default function Map() {
  // 경로 상세 response 담는 state
  const [pathDetailLocations, setPathDetailLocations] = useState<
    PathDetailResponseProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPathDetail({
        sx: temptObj.departureLongitude,
        sy: temptObj.departureLatitude,
        ex: temptObj.arrivalLongitude,
        ey: temptObj.arrivalLatitude,
        index: 1,
      });
      setPathDetailLocations(res);
    };
    fetchData();
  }, []);

  // 지도불러오는 script
  const kakaoMapScript = document.createElement('script');
  kakaoMapScript.async = false;
  kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
  document.head.appendChild(kakaoMapScript);

  kakaoMapScript.addEventListener('load', () =>
    onLoadKakaoAPI(pathDetailLocations)
  );

  return <Container id="map"></Container>;
}

const Container = styled.div`
  z-index: 0;
  width: 390px;
  height: 442px;
`;
