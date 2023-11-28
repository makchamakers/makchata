import { getSearchResult } from '@/api/api';
import useDebounce from '@/hooks/useDebounce';
import { addressesState, searchState } from '@/recoil/search';
import React, { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

interface InputProps {
  inputType: string;
  onClick: () => void;
}
const Input = ({ inputType, onClick }: InputProps) => {
  const [search, setSearch] = useRecoilState(searchState);
  const setAddresses = useSetRecoilState(addressesState);
  const debounceValue = useDebounce(search, 500);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const fetchSearchValue = async (val: string) => {
    const response = await getSearchResult(val);
    return setAddresses(response);
  };

  useEffect(() => {
    if (inputType === 'arrival' && debounceValue.arrival.length > 0) {
      fetchSearchValue(debounceValue.arrival);
      return;
    }
    if (inputType === 'departure' && debounceValue.departure.length > 0) {
      fetchSearchValue(debounceValue.departure);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue.arrival, debounceValue.departure]);

  return (
    <>
      <SearchInput
        onChange={(e) => onChangeValue(e)}
        onClick={onClick}
        placeholder={
          inputType === 'arrival'
            ? '도착지를 입력해주세요'
            : '출발지를 입력해주세요'
        }
        name={inputType}
        value={inputType === 'arrival' ? search.arrival : search.departure}
      />
    </>
  );
};

export default Input;

const SearchInput = styled.input`
  display: flex;
  width: 290px;
  position: relative;
  padding-right: 30px;
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
