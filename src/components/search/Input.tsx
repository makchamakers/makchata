import { getSearchResult } from '@/api/api';
import useDebounce from '@/hooks/useDebounce';
import { addressesState, searchState } from '@/recoil/search';
import React, { ChangeEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

interface InputProps {
  type: string;
  onClick: () => void;
}
const Input = ({ type, onClick }: InputProps) => {
  const [search, setSearch] = useRecoilState(searchState);
  const [, setAddresses] = useRecoilState(addressesState);
  const debounceValue = useDebounce(search, 500);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSearch({ ...search, [name]: value });
  };

  useEffect(() => {
    if (debounceValue) {
      if (type === 'arrival') {
        getSearchResult(search.arrival).then((res) => setAddresses(res));
      } else {
        getSearchResult(search.departure).then((res) => setAddresses(res));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, setAddresses]);

  return (
    <>
      {type === 'arrival' ? (
        <SearchInput
          onChange={(e) => onChangeValue(e)}
          onClick={onClick}
          placeholder="도착지를 입력해주세요"
          name={type}
          value={search.arrival}
        />
      ) : (
        <SearchInput
          onChange={(e) => onChangeValue(e)}
          onClick={onClick}
          placeholder="출발지를 입력해주세요"
          name={type}
          value={search.departure}
        />
      )}
    </>
  );
};

export default Input;

const SearchInput = styled.input`
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
