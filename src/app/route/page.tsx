'use client';

import styled from 'styled-components';
import Summary from '@/components/route/Summary';
import AlarmModal from '@/components/route/AlarmModal';
import { useState } from 'react';

export default function Page() {
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);

  return (
    <Container>
      <Summary />
      <FixedBtn>
        <button type="button" onClick={() => setIsAlarmModalOpen(true)}>
          이 경로로 알림 설정하기
        </button>
      </FixedBtn>
      {isAlarmModalOpen && (
        <AlarmModal setIsAlarmModalOpen={setIsAlarmModalOpen} />
      )}
    </Container>
  );
}

const Container = styled.div`
  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }
`;

const FixedBtn = styled.div`
  position: fixed;
  bottom: 0;

  width: 390px;
  padding: 8px 16px 34px;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
    border-radius: 14px;
    padding: 13px 10px;
    background-color: #ff8048;

    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }
`;
