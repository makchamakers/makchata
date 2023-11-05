'use client';

import NavigationBar from '@/components/NavigationBar';
import PathDetail from '@/components/route/bottomSheet/PathDetail';
import { alarmState } from '@/recoil/alarm';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import icExclamationMark from 'public/assets/icons/ic_exclamationMark_gray.svg';
import icCharDefault from 'public/assets/icons/ic_char_default.svg';
import { useEffect, useState } from 'react';

export default function Home() {
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const [restHour, setRestHour] = useState('0');
  const [restMinute, setRestMinute] = useState('0');

  if (alarm === false) {
    setAlarm(alarm);
  }

  const alarmSettingHandler = () => {
    if (alarm === true) {
      setAlarm(!alarm);
    }
  };

  const progress = 0;

  function updateCurrentTime() {
    // 막차 시간 임의로 설정
    const makchaTime = new Date('Thu Nov 02 2023 23:59:59 GMT+0900');
    const currentTime = new Date();

    // 두 시간 사이의 차이 (밀리초)
    const timeDifferenceInMilliseconds =
      makchaTime.getTime() - currentTime.getTime();

    // 차이를 시간과 분으로 계산
    const newRestHour = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60)
    );
    const newRestMinute = Math.floor(
      (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const formattedRestHour = String(newRestHour).padStart(2, '0');
    const formattedRestMinute = String(newRestMinute).padStart(2, '0');

    // restHour와 restMinute 상태 업데이트
    setRestHour(formattedRestHour);
    setRestMinute(formattedRestMinute);

    console.log(`남은 시간: ${newRestHour} 시간 ${newRestMinute} 분`);
    console.log(timeDifferenceInMilliseconds);
  }

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    // 맨 처음에 한 번 실행
    updateCurrentTime();

    // 그 후에는 1분마다 실행
    const timerId = setInterval(updateCurrentTime, 60000);

    return () => {
      clearInterval(timerId); // 컴포넌트가 언마운트되면 타이머 해제
    };
  }, []);

  //게이지 기본 속성값
  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 둘레 길이
  const dashoffset = CIRCUMFERENCE * (1 - progress);

  //현재 남은 시간 게이지
  // const timeGage = progress / 100;

  return (
    <Container>
      <TitleWrapper>
        <Title>
          <span>막차타</span>랑 같이
          <br />
          막차타요
        </Title>
        <Image
          src={icCharDefault}
          width={110}
          height={96}
          alt="막차타일러스트"
        />
      </TitleWrapper>

      <ContentWrapper>
        <AlarmCard>
          <AlarmSetting>
            <StartingPoint alarm={alarm.toString()}>
              출발지
              <Link href={'/search'}>
                {alarm === false
                  ? '출발지 설정하기'
                  : '서울시 강남구 도산대로 15길 11'}
              </Link>
            </StartingPoint>
            <Destination alarm={alarm.toString()}>
              도착지
              <Link href={'/search'}>
                {alarm === false ? '도착지 설정하기' : '서울대학교 관악캠퍼스'}
              </Link>
            </Destination>
            <StartAlarm alarm={alarm.toString()}>
              <p>출발 알림</p>
              <AlarmToggle alarm={alarm.toString()}>
                <ToggleSwitch
                  alarm={alarm.toString()}
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
                stroke="#FFD9C9"
                strokeDasharray={`${CIRCUMFERENCE * 0.65} ${
                  CIRCUMFERENCE * 0.35
                }`}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <circle
                // ref={barRef}
                className="bar"
                cx="60"
                cy="60"
                r={RADIUS}
                stroke={alarm === false ? '#ddd' : 'FFD9C9'}
                strokeWidth="15"
                strokeDasharray="0"
                strokeDashoffset={dashoffset}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <AlarmTimer alarm={alarm.toString()}>
              {alarm === false ? '00:00' : `${restHour} : ${restMinute}`}
            </AlarmTimer>
          </AlarmGage>
        </AlarmCard>
        <RouteWrap>
          {alarm === false ? (
            <InfoBox>
              <Image
                src={icExclamationMark}
                alt="alert이미지"
                width={40}
                height={40}
              />
              <p>막차 경로를 설정해주세요</p>
            </InfoBox>
          ) : (
            <>
              <h3>오늘 꼭 타야하는 막차 경로</h3>
              <PathDetail />
            </>
          )}
        </RouteWrap>
        <NavigationBar />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100vh;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  background-color: #ffd9c9;
  color: #242424;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 69px 16px 0;
`;

const Title = styled.h1`
  font-weight: 300;
  & > span {
    font-weight: 700;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  top: 100px;
  width: 100%;
  min-height: calc(100% - 265px);
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-top: 116px;
  padding-bottom: 88px;
`;

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
const StartingPoint = styled.p<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
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
const Destination = styled.p<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
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
const StartAlarm = styled.div<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  padding-top: 18px;
  & p {
    font-size: 14px;
    font-weight: 700;
    line-height: 26px;
  }
`;
const AlarmToggle = styled.div<{ alarm: string }>`
  background-color: ${(props) =>
    props.alarm === 'true' ? '#FFD9C9' : '#D9D9D9'};
  width: 58px;
  height: 26px;
  border-radius: 20px;
  margin-left: 10px;
`;
const ToggleSwitch = styled.button<{ alarm: string }>`
  color: #fff;
  background-color: ${(props) => (props.alarm === 'true' ? '#FF8048' : '#888')};
  border: none;
  width: 35px;
  height: 22px;
  border-radius: 20px;
  font-size: 12px;
  transform: ${(props) =>
    props.alarm === 'true' ? 'translate(20px, 2px);' : 'translate(2px, 2px);'};
  transition: 0.3s;
`;
const AlarmGage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const AlarmTimer = styled.p<{ alarm: string }>`
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: ${(props) => (props.alarm === 'true' ? '#FF8048' : '#aaa')};
`;

const RouteWrap = styled.div`
  padding-left: 16px;

  h3 {
    margin-bottom: 16px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 84px;
  & img {
    margin-bottom: 14px;
  }
  & p {
    color: #aaa;
    font-weight: 300;
  }
`;
