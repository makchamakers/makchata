import { getSearchResult } from '@/api/api';
import useDebounce from '@/hooks/useDebounce';
import { departureAddressesState, departureResultState } from '@/recoil/search';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

//{ defaultLocation }: { defaultLocation: string } 이슈 의견이 모아지면 다시 수정.
const DepartureInput = () => {
  const [search, setSearch] = useState('');
  const [, setAddresses] = useRecoilState(departureAddressesState);
  const debounceValue = useDebounce(search, 500);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setSearch(value);
  };
  const decisionDeparture = useRecoilValue(departureResultState);

  useEffect(() => {
    if (debounceValue)
      getSearchResult(search).then((res) => {
        console.log(res);
        setAddresses(res);
      });
  }, [debounceValue, setAddresses]);

  return (
    <Input
      onChange={(e) => onChangeValue(e)}
      placeholder="출발지를 입력해주세요"
      //defaultValue={defaultLocation}
      value={decisionDeparture.detailAddress || search}
    />
  );
};

export default DepartureInput;

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
