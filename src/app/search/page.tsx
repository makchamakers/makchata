'use client';

import ChipButton from '@/components/search/ChipButton';
import { SwitchSVG, XSVG } from '@/components/search/assets';
import styled from 'styled-components';

// TODO: 컴포넌트 분리
export default function SearchPage() {
  return (
    <Wrap>
      <Header>
        <SwitchSVG />
        <div>
          <Input name="departure" placeholder="출발지를 입력해주세요" />
          <Input name="arrival" placeholder="도착지를 입력해주세요" />
        </div>
        <ResetBox>
          <XSVG />
        </ResetBox>
      </Header>
      <ButtonWrap>
        <article>
          <ChipButton text="우리집" onClick={() => console.log('hi')} />
          <ChipButton text="회사" onClick={() => console.log('hi')} />
          <ChipButton text="헬스장" onClick={() => console.log('hi')} />
        </article>
        {/* TODO: 스타일 수정 */}
        <ChipButton text="장소 즐겨찾기" onClick={() => console.log('hi')} />
      </ButtonWrap>
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
