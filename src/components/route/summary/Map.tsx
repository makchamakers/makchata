'use client';

import { getPathDetail } from '@/utils/apis/path';
import { PathProps, PathDetailResponseProps } from '@/type/path';
import { ParamsProps } from '@/type/route';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { pathResultState } from '@/recoil/search';
import { IPathProps } from '@/type/search';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

// 지도 띄우기 함수
const onLoadKakaoAPI = (
  selectedPathResult: IPathProps,
  pathDetailLocationList: PathProps[]
) => {
  console.log(pathDetailLocationList);
  window.kakao.maps.load(() => {
    // 초기 지도화면 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(
        selectedPathResult.departure.y,
        selectedPathResult.departure.x
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
          selectedPathResult.departure.y,
          selectedPathResult.departure.x
        ),
        src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/blue_b.png',
      },
      {
        title: '도착지',
        latlng: new window.kakao.maps.LatLng(
          selectedPathResult.arrival.y,
          selectedPathResult.arrival.x
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
    const arrayExceptedWalkingPath = pathDetailLocationList.filter(
      (path) => path.trafficType !== '도보'
    );
    arrayExceptedWalkingPath.map((path) => {
      linePaths.push({
        path: path.coords?.map(
          (coord) => new window.kakao.maps.LatLng(coord.y, coord.x)
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

export default function Map({ params }: ParamsProps) {
  // 경로 상세 response 담는 state
  const [pathDetailLocations, setPathDetailLocations] =
    useState<PathDetailResponseProps>();
  const [selectedPathResult] = useRecoilState<IPathProps>(pathResultState);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPathDetail({
        // recoil pathResultState 값 사용 예정
        sx: selectedPathResult.arrival.x,
        sy: selectedPathResult.arrival.y,
        ex: selectedPathResult.departure.x,
        ey: selectedPathResult.departure.y,
        index: params.index,
      });
      setPathDetailLocations(res);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 지도불러오는 script
  let kakaoMapScript;
  // eslint-disable-next-line prefer-const
  if (typeof document !== 'undefined') {
    kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener(
      'load',
      () =>
        pathDetailLocations &&
        onLoadKakaoAPI(selectedPathResult, pathDetailLocations?.path)
    );
  }

  return <Container id="map"></Container>;
}

const Container = styled.div`
  z-index: 0;
  width: 390px;
  height: 442px;
`;
