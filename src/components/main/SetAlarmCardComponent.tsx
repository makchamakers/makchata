import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const SetAlarmCardComponent = () => {
  return (
    <SetAlarmCard>
      <AlarmBox>
        <AlarmText>오늘의 막차 알림을 설정해볼까요? </AlarmText>
        <Link href={'/search'}>
          <SetAlarmButton>막차 알림 설정하기 </SetAlarmButton>
        </Link>
      </AlarmBox>
    </SetAlarmCard>
  );
};

export default SetAlarmCardComponent;

const SetAlarmCard = styled.div`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: calc(100% - 32px);
  height: 168px;
  background-color: #fff;
  padding: 29px 32px;
  margin: 16px auto;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const AlarmBox = styled.div`
  width: 100%;
`;

const AlarmText = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
`;

const SetAlarmButton = styled.button`
  width: 100%;
  height: 50%;
  background-color: #ff7f48;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
`;
