'use client';
import { ChipButton, PlaceCard } from '@/components/search';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { addressesState, pathResultState } from '@/recoil/search';
import Input from '@/components/search/Input';
import ResultCards from '@/components/search/ResultCards';

export default function SearchPage() {
  const addresses = useRecoilValue(addressesState);
  const pathResult = useRecoilValue(pathResultState);
  const [inputType, setInputType] = useState('departure');
  const resetAddresses = useResetRecoilState(addressesState);
  useEffect(() => {
    if (
      pathResult.arrival.address.length !== 0 &&
      pathResult.departure.address.length !== 0
    ) {
      resetAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          <Input
            inputType="departure"
            onClick={() => setInputType('departure')}
          />
          <Input inputType="arrival" onClick={() => setInputType('arrival')} />
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
      {addresses.length > 0 &&
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
      {pathResult.arrival.address.length !== 0 &&
        pathResult.departure.address.length !== 0 && <ResultCards />}
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
