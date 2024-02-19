'use client';
import icX from 'public/assets/icons/ic_x_lg.svg';
import icExchange from 'public/assets/icons/ic_exchange.png';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  addressesState,
  pathResultState,
  remainPathState,
  searchState,
} from '@/recoil/search';
import Input from '@/components/search/Input';
import ResultCards from '@/components/search/Card/ResultCards';
import CurrentLocationButton from '@/components/search/Button/CurrentLocationButton';
import Image from 'next/image';
import ChipButton from '@/components/search/Button/ChipButton';
import RouteCard from '@/components/search/Card/RouteCard';
import PlaceCard from '@/components/search/Card/PlaceCard';

export default function SearchPage() {
  const addresses = useRecoilValue(addressesState);
  const pathResult = useRecoilValue(pathResultState);
  const [inputType, setInputType] = useState('departure');
  const resetAddresses = useResetRecoilState(addressesState);
  const [remainPath, setRemainPath] = useRecoilState(remainPathState);
  const [search, setSearch] = useRecoilState(searchState);

  useEffect(() => {
    if (
      pathResult?.arrival?.address?.length !== 0 &&
      pathResult?.departure?.address?.length !== 0
    ) {
      resetAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  // addresses가 변할 때 실행되면 로컬스토리지에 addresses의 갯수만큼 저장됨.
  // 그렇기 때문에 deps에 보이는 것처럼 적어 놓음.
  useEffect(() => {
    if (
      pathResult?.arrival?.address?.length !== 0 &&
      pathResult?.departure?.address?.length !== 0
    ) {
      setRemainPath([...remainPath, pathResult]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathResult.arrival.address, pathResult.departure.address]);

  const changeSearchValue = () => {
    setSearch({ arrival: search.departure, departure: search.arrival });
  };

  const deleteSearchValue = () => {
    setSearch({ ...search, departure: '' });
  };

  return (
    <Wrap>
      <Header>
        <Image
          src={icExchange}
          alt={'출발지, 도착지 교환'}
          onClick={() => changeSearchValue()}
          style={{ cursor: 'pointer' }}
        />
        <div>
          <InputWrap>
            <Input
              inputType="departure"
              onClick={() => setInputType('departure')}
            />
            <CurrentLocationButton />
          </InputWrap>
          <Input inputType="arrival" onClick={() => setInputType('arrival')} />
        </div>
        <ResetBox>
          <Image
            src={icX}
            alt={'출발지 삭제 버튼'}
            onClick={() => deleteSearchValue()}
            style={{ cursor: 'pointer' }}
          />
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
      {/* input들에 value가 없으면서, localStorage에 value가 있을 때 */}
      {addresses?.length === 0 &&
        pathResult?.arrival?.address?.length === 0 &&
        pathResult?.departure?.address?.length === 0 && <RouteCard />}
      {addresses?.length > 0 &&
        addresses?.map(({ address_name, place_name, x, y }, index) => {
          return (
            <PlaceCard
              key={index}
              address={address_name}
              location={place_name}
              x={Number(x)}
              y={Number(y)}
              type={inputType}
            />
          );
        })}
      {pathResult?.arrival?.address?.length !== 0 &&
        pathResult?.departure?.address?.length !== 0 && <ResultCards />}
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

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
