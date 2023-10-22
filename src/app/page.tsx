'use client';

import { useRecoilState } from 'recoil';
import { alarmState } from '@/recoil/alarm';
import styled from 'styled-components';
import Image from 'next/image';
import makchata from '/public/makchata_illust.png';

export default function Home() {
  const [alarm, setAlarm] = useRecoilState(alarmState);

  const alarmSettingHandler = () => {
    setAlarm(!alarm);
  };
  const currentTime = new Date();

  function updateCurrentTime() {
    const makchaTime = new Date('Sun Oct 22 2023 24:00:00 GMT+0900');
    const updatedCurrentTime = new Date();

    const timeDifference = makchaTime.getTime() - updatedCurrentTime.getTime();
    const totalTime = makchaTime.getTime() - currentTime.getTime();
    const progress = timeDifference / totalTime;

    console.log(progress);
    return progress;
  }

  // 맨 처음에 한 번 실행
  updateCurrentTime();

  // 그 후에는 1분마다 실행
  setInterval(updateCurrentTime, 60000);

  //게이지 기본 속성값
  const RADIUS = 60;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 둘레 길이

  //현재 남은 시간 게이지
  // const timeGage = ()

  return (
    <Container>
      <TitleWrapper>
        <Title>
          <span>막차타</span>랑 같이
          <br />
          막차타요
        </Title>
        <Image src={makchata} width={110} height={96} alt="막차타일러스트" />
      </TitleWrapper>

      <ContentWrapper>
        <AlarmCard>
          <AlarmSetting>
            <StartingPoint alarm={alarm.toString()}>
              출발지
              <span>출발지 설정하기</span>
            </StartingPoint>
            <Destination alarm={alarm.toString()}>
              도착지
              <span>도착지 설정하기</span>
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
                r="54"
                strokeWidth="12"
              />
              <circle className="bar" cx="60" cy="60" r="54" strokeWidth="12" />
            </svg>
            <p></p>
          </AlarmGage>
        </AlarmCard>
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
  height: calc(100% - 269px);
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 116px 16px 0;
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
  width: calc(100% - 120px);
`;
const StartingPoint = styled.p<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
  font-size: 14px;
  font-weight: 700;
  & span {
    font-weight: 300;
    padding-left: 8px;
  }
  padding-bottom: 8px;
`;
const Destination = styled.p<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
  font-size: 14px;
  font-weight: 700;
  & span {
    font-weight: 300;
    padding-left: 8px;
  }
  border-bottom: 1px solid #ccc;
  padding-bottom: 18px;
`;
const StartAlarm = styled.div<{ alarm: string }>`
  color: ${(props) => (props.alarm === 'true' ? '#333' : '#ccc')};
  display: flex;
  align-item: center;
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
  width: 120px;
  height: 120px;
  & .circle_progress {
    transform: rotate(-90deg);
  }
  & .frame,
  & .bar {
    fill: none;
  }
  & .frame {
    stroke: #e6e6e6;
  }
  & .bar {
    stroke: #03c75a;
    stroke-linecap: round;
  }
`;
