'use client';

import {
  ChipButton,
  RouteCard,
  PlaceCard,
  ResultCard,
} from '@/components/search';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const mockData = {
  departure: {
    address: '서울 강남구 도산대로15길 11',
    x: '127.10522081658463',
    y: '37.35951219616309',
  },
  arrival: {
    address: '서울대학교 관악캠퍼스',
    x: '127.0329328',
    y: '37.4978626',
  },
};

interface IResult {
  address: string;
  // x: string;
  // y: string;
}

const resultMockData: IResult[] = [
  { address: '서울대학교 관악캠퍼스' },
  { address: '서울 강남구 도산대로15길 11' },
  { address: '서울 강남구 도산대로15길 11' },
];

export default function SearchPage() {
  const router = useRouter();
  const [departure, setDeparture] = useState({
    keyword: '',
    selected: '',
    result: [{ address: '서울 강남구 도산대로15길 11' }],
    isFocused: false,
  });

  const [arrival, setArrival] = useState({
    keyword: '',
    selected: '',
    result: [{ address: '서울 강남구 도산대로15길 11' }],
    isFocused: false,
  });

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'arrival') {
      setArrival({ ...arrival, keyword: value, result: resultMockData });
    } else {
      setDeparture({ ...departure, keyword: value });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDeparture({
        ...departure,
        selected: mockData.departure.address,
        keyword: `내위치: ${mockData.departure.address}`,
      });
    }, 500);
  }, []);

  useEffect(() => {
    console.log('de', departure.selected, 'ar', arrival.selected);

    if (departure.selected && arrival.selected) {
      router.push('/route');
    }
  }, [departure.selected, arrival.selected]);

  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          <Input
            name="departure"
            placeholder="출발지를 입력해주세요"
            value={departure.keyword}
            onFocus={() => setDeparture({ ...departure, isFocused: true })}
            onBlur={() => setDeparture({ ...departure, isFocused: false })}
            onChange={handleInput}
          />
          <Input
            name="arrival"
            placeholder="도착지를 입력해주세요"
            value={arrival.keyword}
            onFocus={() => setArrival({ ...arrival, isFocused: true })}
            onBlur={() =>
              setTimeout(
                () => setDeparture({ ...departure, isFocused: false }),
                200
              )
            }
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
          <ChipButton
            disabled={true}
            text="우리집"
            onClick={() => console.log('hi')}
          />
          <ChipButton
            disabled={true}
            text="회사"
            onClick={() => console.log('hi')}
          />
          <ChipButton
            disabled={true}
            text="헬스장"
            onClick={() => console.log('hi')}
          />
        </article>
        {/* TODO: 즐겨찾기 스타일, onClick 수정 */}
        <ChipButton
          disabled={true}
          text="장소 즐겨찾기"
          onClick={() => console.log('hi')}
        />
      </ButtonWrap>

      {arrival.isFocused && arrival.keyword.includes('서울') && (
        <Ul>
          <PlaceCard
            address="서울대학교 관악캠퍼스"
            detailAddress="서울대학교 관악캠퍼스"
          />
        </Ul>
      )}

      {!arrival.isFocused &&
        !departure.isFocused &&
        (!departure.selected || !arrival.selected) && (
          <>
            <SmallTitle>최근 검색 경로</SmallTitle>
            <RouteCard
              departure="서울대학교 관악캠퍼스"
              arrival="서울 강남구 도산대로15길 11"
              link="/route"
            />
          </>
        )}

      {departure.selected && arrival.selected && (
        <ResultWrap>
          <ResultCard link="/route" />
          <ResultCard link="/route" />
        </ResultWrap>
      )}
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
  padding: 16px;
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
