import { alarmSettingState, alarmState } from '@/recoil/alarm';
import { updateCurrentTime } from '@/utils/time/alarmTime';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import IcClose from 'public/assets/icons/ic_close.png';

export const AlarmCardComponent = () => {
  const alarmSettingTime: Date = useRecoilValue(alarmSettingState);
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const [timeGage, setTimeGage] = useState(0);
  const [restHour, setRestHour] = useState('0');
  const [restMinute, setRestMinute] = useState('0');

  useEffect(() => {
    if (alarm === false) {
      setAlarm(alarm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarm]);

  const { formattedRestHour, currentLeftTime, formattedRestMinute } =
    updateCurrentTime(alarmSettingTime);
  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    // 맨 처음에 한 번 실행
    setRestHour(formattedRestHour);
    setRestMinute(formattedRestMinute);
    setTimeGage(currentLeftTime);
    // 그 후에는 1분마다 실행
    const timerId = setInterval(updateCurrentTime, 60000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alarmSettingHandler = () => {
    if (alarm === true) {
      setAlarm(!alarm);
    }
  };
  //게이지 기본 속성값
  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 둘레 길이
  const progress = timeGage / 100;
  const circleProgress = CIRCUMFERENCE * (1 - progress);
  return (
    <>
      <AlarmCard>
        <AlarmSetting>
          <StartingPoint $alarm={alarm.toString()}>
            출발지
            <Link href={'/search'}>
              {alarm === false ? '출발지 설정하기' : ''}
            </Link>
          </StartingPoint>
          <Destination $alarm={alarm.toString()}>
            도착지
            <Link href={'/search'}>
              {alarm === false ? '도착지 설정하기' : ''}
            </Link>
          </Destination>
          <StartAlarm $alarm={alarm.toString()}>
            <p>출발 알림</p>
            <AlarmToggle $alarm={alarm.toString()}>
              <ToggleSwitch
                $alarm={alarm.toString()}
                onClick={() => {
                  alarmSettingHandler();
                }}
              >
                {alarm === false ? 'OFF' : 'ON'}
              </ToggleSwitch>
            </AlarmToggle>
          </StartAlarm>
        </AlarmSetting>
        <AlarmGage>
          <svg
            className="circle_progress"
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            <circle
              className="frame"
              cx="60"
              cy="60"
              r={RADIUS}
              strokeWidth="15"
              fill="transparent"
              stroke="#ddd"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            <circle
              className="bar"
              cx="60"
              cy="60"
              r={RADIUS}
              stroke={alarm === false ? '#ddd' : '#FFD9C9'}
              strokeWidth="15"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={circleProgress}
              fill="transparent"
              strokeLinecap="round"
            />
          </svg>
          <AlarmTimer $alarm={alarm.toString()}>
            {alarm === false ? '00:00' : `${restHour} : ${restMinute}`}
          </AlarmTimer>
        </AlarmGage>
      </AlarmCard>
      <CloseButton>
        <Image src={IcClose} alt={'지정한 경로 삭제 버튼'}></Image>
      </CloseButton>
    </>
  );
};

export default AlarmCardComponent;

const AlarmCard = styled.div`
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
const AlarmSetting = styled.div`
  width: calc(100% - 140px);
  margin-right: 16px;

  p {
    display: flex;
    align-items: center;
  }
`;
const StartingPoint = styled.p<{ $alarm: string }>`
  color: ${(props) => (props.$alarm === 'true' ? '#333' : '#ccc')};
  font-size: 14px;
  font-weight: 700;
  & a {
    font-weight: 300;
    padding-left: 8px;
    display: inline-block;
    width: 103px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  padding-bottom: 8px;
`;
const Destination = styled.p<{ $alarm: string }>`
  color: ${(props) => (props.$alarm === 'true' ? '#333' : '#ccc')};
  font-size: 14px;
  font-weight: 700;
  & a {
    font-weight: 300;
    padding-left: 8px;
    display: inline-block;
    width: 103px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  border-bottom: 1px solid #ccc;
  padding-bottom: 18px;
`;
const StartAlarm = styled.div<{ $alarm: string }>`
  color: ${(props) => (props.$alarm === 'true' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  padding-top: 18px;
  & p {
    font-size: 14px;
    font-weight: 700;
    line-height: 26px;
  }
`;
const AlarmToggle = styled.div<{ $alarm: string }>`
  background-color: ${(props) =>
    props.$alarm === 'true' ? '#FFD9C9' : '#D9D9D9'};
  width: 58px;
  height: 26px;
  border-radius: 20px;
  margin-left: 10px;
`;
const ToggleSwitch = styled.button<{ $alarm: string }>`
  color: #fff;
  background-color: ${(props) =>
    props.$alarm === 'true' ? '#FF8048' : '#888'};
  border: none;
  width: 35px;
  height: 22px;
  border-radius: 20px;
  font-size: 12px;
  transform: ${(props) =>
    props.$alarm === 'true' ? 'translate(20px, 2px);' : 'translate(2px, 2px);'};
  transition: 0.3s;
`;
const AlarmGage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
`;

const AlarmTimer = styled.p<{ $alarm: string }>`
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: ${(props) => (props.$alarm === 'true' ? '#FF8048' : '#aaa')};
`;

const CloseButton = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  right: 25px;
  top: -70px;
`;
