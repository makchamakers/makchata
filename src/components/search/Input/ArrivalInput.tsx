import { getSearchResult } from '@/api/api';
import useDebounce from '@/hooks/useDebounce';
import { arrivalAddressesState, arrivalResultState } from '@/recoil/search';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const ArrivalInput = () => {
  const [search, setSearch] = useState('');
  const [, setAddresses] = useRecoilState(arrivalAddressesState);
  const debounceValue = useDebounce(search, 500);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };
  const decisionArrival = useRecoilValue(arrivalResultState);

  useEffect(() => {
    if (debounceValue) getSearchResult(search).then((res) => setAddresses(res));
  }, [debounceValue, setAddresses]);

  return (
    <Input
      onChange={(e) => onChangeValue(e)}
      placeholder="도착지를 입력해주세요"
      value={decisionArrival.detailAddress || search}
    />
  );
};

export default ArrivalInput;

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
