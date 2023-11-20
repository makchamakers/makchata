import React from 'react';
import mock from './detailRouteMockData.json';
import styled from 'styled-components';
import { subwayColor } from '@/constants/routeColor';

interface DetailRouteProps {
  index: number;
}

const DetailRoute: React.FC<DetailRouteProps> = ({ index }) => {
  const subPath: any = mock.result.path[index].subPath;

  return (
    <RouteWrapper>
      <StartPoint>
        <span>00:11</span>서울 강남구 도산대로 15길 11
      </StartPoint>
      {subPath.map((step: any, index: number) => {
        console.log(step);
        switch (step.trafficType) {
          case 1: // Subway
            return (
              <SubwayStep key={index} $line={step?.lane[0]?.subwayCode}>
                <StepIcons
                  $trafficType="sub"
                  $line={step?.lane[0]?.subwayCode}
                />
                <RidingStep>
                  {step?.lane[0]?.subwayCode}호선 {step.startName}역 승차
                </RidingStep>
                <StepTrans>빠른 환승 {step.door}</StepTrans>
                <QuitStepIcons
                  $trafficType="sub"
                  $line={step?.lane[0]?.subwayCode}
                />
                <QuitStep>{step.endName} 하차</QuitStep>
                <SectionTime>{step.sectionTime}분</SectionTime>
              </SubwayStep>
            );
          case 2: // Bus
            return (
              <BusStep key={index}>
                <StepIcons $trafficType="bus" $line={step?.lane[0]?.busNo} />
                <p>{step?.lane[0]?.busNo}</p>
                <p>{step.startName}</p>
                <p>{step.endName}</p>
                <SectionTime>{step.sectionTime}분</SectionTime>
              </BusStep>
            );
          case 3: // Walk
            return (
              <WalkStep key={index}>
                <p>
                  {subPath[index + 1]?.startName}
                  {subPath[index + 1]?.trafficType === 1
                    ? '역'
                    : '정류장'} 까지 {step.distance}m 걷기
                </p>
                <SectionTime>{step.sectionTime}분</SectionTime>
              </WalkStep>
            );
          default:
            return null;
        }
      })}
      <EndPoint>
        <span>00:11</span>서울 강남구 도산대로 15길 11
      </EndPoint>
    </RouteWrapper>
  );
};

export default DetailRoute;

const RouteWrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding-bottom: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  & p {
    width: 100%;
  }
`;

const StartPoint = styled.p`
  position: relative;
  width: calc(100% - 78px);
  margin-left: 78px;
  line-height: 42px;
  font-weight: 700;
  &::before {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%);
    content: '';
    display: inline-block;
    background: url('/assets/icons/ic_directionStart_gray.svg');
    width: 42px;
    height: 42px;
  }
  & span {
    position: absolute;
    top: 50%;
    left: -78px;
    transform: translateY(-50%);
  }
`;

const EndPoint = styled.p`
  position: relative;
  width: calc(100% - 78px);
  margin-left: 78px;
  line-height: 42px;
  font-weight: 700;
  &::before {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%);
    content: '';
    display: inline-block;
    background: url('/assets/icons/ic_directionEnd_gray.svg');
    width: 42px;
    height: 42px;
  }
  & span {
    position: absolute;
    top: 50%;
    left: -78px;
    transform: translateY(-50%);
  }
`;

const SubwayStep = styled.div<{ $line: number }>`
  position: relative;
  // height: 88px;
  border-left: ${(props) => `solid 3px #${subwayColor[props.$line] || '000'}`};
  margin-left: 58px;
  & p {
    padding-left: 21px;
    position: relative;
  }
`;
const BusStep = styled.div`
  position: relative;
  margin-left: 58px;
  line-height: 42px;
  & p {
    padding-left: 21px;
  }
`;

const StepIcons = styled.div<{ $trafficType: string; $line: string }>`
  position: relative;
  width: 25px;
  height: 25px;
  left: -12px;
  background-color: ${(props) =>
    props.$trafficType === 'sub'
      ? `#${subwayColor[props.$line]}`
      : `#${props.$line}`};

  z-index: 1;
  border-radius: 20px;

  &::after {
    position: absolute;
    top: 4px;
    left: 4px;
    content: '';
    background: ${(props) =>
      `url('/assets/icons/ic_${props.$trafficType}_white.svg')`};
    background-repeat: no-repeat;
    width: 23px;
    height: 23px;
  }
`;

const QuitStepIcons = styled.div<{ $trafficType: string; $line: string }>`
  position: relative;
  width: 25px;
  height: 25px;
  left: -12px;
  bottom: -21px;
  background-color: ${(props) =>
    props.$trafficType === 'sub'
      ? `#${subwayColor[props.$line]}`
      : `#${props.$line}`};

  z-index: 1;
  border-radius: 20px;
  &::after {
    position: absolute;
    top: 6px;
    left: 4px;
    content: '하차';
    color: #fff;
    font-size: 10px;
  }
`;

const RidingStep = styled.p`
  position: relative;
  bottom: 21px;
`;
const QuitStep = styled.p`
  position: relative;
  bottom: 0;
`;

const StepTrans = styled.p``;

const WalkStep = styled.div`
  position: relative;
  margin-left: 58px;
  padding: 20px 0;
  border-left: 2px dashed #bbb;
  line-height: 42px;
  & p {
    padding-left: 21px;
  }
`;

const SectionTime = styled.span`
  position: absolute;
  top: 50%;
  left: -60px;
  transform: translateY(-50%);
`;
