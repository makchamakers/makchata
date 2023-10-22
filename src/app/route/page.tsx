'use client';

import styled from 'styled-components';
import Summary from '@/components/route/Summary';

export default function page() {
  <Container>
    <Summary />
    <FixedBtn>
      <button type="button">이 경로로 알림 설정하기</button>
    </FixedBtn>
  </Container>;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FixedBtn = styled.div`
  position: fixed;
  bottom: 0;
  width: full;
  padding: 8px 16px 34px;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.08);

  button {
    width: full;
    border-radius: 14px;
    padding: 13px 10px;
    background-color: #ff8048;

    color: #fff;
  }
`;
