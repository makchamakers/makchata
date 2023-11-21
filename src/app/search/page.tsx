'use client';
import { ChipButton, PlaceCard } from '@/components/search';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { addressesState } from '@/recoil/search';
import Input from '@/components/search/Input';

export default function SearchPage() {
  const addresses = useRecoilValue(addressesState);
  const [inputType, setInputType] = useState('departure');

  useEffect(() => {}, [addresses]);

  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          <Input type="departure" onClick={() => setInputType('departure')} />
          <Input type="arrival" onClick={() => setInputType('arrival')} />
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
      {Array.isArray(addresses) &&
        addresses.length > 0 &&
        addresses.map(({ address_name, place_name, x, y }, index) => {
          return (
            <PlaceCard
              key={index}
              address={address_name}
              detailAddress={place_name}
              x={x}
              y={y}
              type={inputType}
            />
          );
        })}
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
