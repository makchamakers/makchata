'use client';

import { getCurrentLocation, getSearchResult } from '@/api/api';
import {
  ChipButton,
  RouteCard,
  PlaceCard,
  ResultCard,
} from '@/components/search';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRef } from 'react';

const validate = (character: string) => {
  return /[ㄱ-ㅎ]|[ㅏ-ㅣ]/.test(character);
};

// TODO: 컴포넌트 분리
export default function SearchPage() {
  // const timer = useRef<unknown>(null);

  const [departure, setDeparture] = useState({
    keyword: '',
    selected: '',
    result: [
      {
        roadAddress: '',
        x: '',
        y: '',
      },
    ],
    isFocused: false,
  });

  const [arrival, setArrival] = useState({
    keyword: '',
    selected: '',
    result: [
      {
        roadAddress: '',
        x: '',
        y: '',
      },
    ],
    isFocused: false,
  });

  const [currentPosition, setCurrentPosition] = useState({
    location: '',
    lat: '',
    long: '',
  });

  useEffect(() => {
    const { geolocation } = navigator;
    let latitude = '';
    let longitude = '';
    geolocation.getCurrentPosition(async (position) => {
      setCurrentPosition({
        ...currentPosition,
        lat: position.coords.latitude.toString(),
        long: position.coords.longitude.toString(),
      });
      latitude = position.coords.latitude.toString();
      longitude = position.coords.longitude.toString();
      await getCurrentLocation(latitude, longitude).then(
        (res: { location: string }) => {
          setCurrentPosition({ ...currentPosition, location: res.location });
        }
      );
    });
  }, []);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'arrival') {
      setArrival({ ...arrival, keyword: value });
    } else {
      setDeparture({ ...departure, keyword: value });
    }

    // if (timer.current) {
    //   clearTimeout(timer.current);
    //  }
    if (validate(value)) return;
    if (!value) {
      return;
    } else {
      // timer.current = setTimeout(() => {
      getSearchResult(
        value,
        `${currentPosition.long},${currentPosition.lat}`
      ).then((res) => {
        console.log(res.address);
        if (name === 'arrival') {
          setArrival({ ...arrival, result: res.addresses });
        } else {
          setDeparture({ ...departure, result: res.addresses });
        }
      });
      //  }, 500);
    }
  };

  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          <Input
            name="departure"
            placeholder="출발지를 입력해주세요"
            value={departure.keyword}
            defaultValue={currentPosition?.location}
            onFocus={() => setDeparture({ ...departure, isFocused: true })}
            onBlur={() => setDeparture({ ...departure, isFocused: false })}
            onChange={handleInput}
          />
          <Input
            name="arrival"
            placeholder="도착지를 입력해주세요"
            value={arrival.keyword}
            onFocus={() => setArrival({ ...arrival, isFocused: true })}
            onBlur={() => setArrival({ ...arrival, isFocused: false })}
            onChange={handleInput}
          />
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
      <Ul>
        <PlaceCard address={'주소'} detailAddress={'주소'} link="/route" />
      </Ul>
      <Ul>
        <SmallTitle>최근 검색 경로</SmallTitle>
        <RouteCard
          arrival="서울 강남구 도산대로15길 11"
          departure="서울대학교 관악캠퍼스"
          link="/route"
        />
      </Ul>
      <ResultWrap>
        <ResultCard link="/route" />
        <ResultCard link="/route" />
      </ResultWrap>
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

const Input = styled.input`
  display: flex;
  width: 290px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  border: 1px solid var(--Gray_aaaaaa, #aaa);
  background: var(--white, #fff);
  color: var(--Black, #242424);
  font-weight: 400;
  line-height: 20px;
  font-size: 14px;

  &:first-of-type {
    margin-bottom: 6px;
  }

  &:focus {
    outline: none;
    border: 1px solid var(--Primary01, #ff8048);
  }

  &::placeholder {
    color: var(--Gray_cccccc, #ccc);
    font-size: 14px;
    font-weight: 400;
  }
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

const Ul = styled.ul`
  list-style: none;
  width: 100%;
  padding: 16px;
`;

const SmallTitle = styled.p`
  color: var(--Gray_888888, #888);
  padding-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const ResultWrap = styled.ul`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
