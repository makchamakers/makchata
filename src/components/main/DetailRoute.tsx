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
      {subPath.map((step: any, index: any) => {
        console.log(step);
        switch (step.trafficType) {
          case 1: // Subway
            return (
              <SubwayStep key={index} $line={step?.lane[0]?.subwayCode}>
                <p>
                  {step?.lane[0]?.subwayCode}호선 {step.startName}역 승차
                </p>
                <span>빠른 환승 {step.door}</span>
                <p>{step.endName} 하차</p>
                <SectionTime>{step.sectionTime}분</SectionTime>
              </SubwayStep>
            );
          case 2: // Bus
            return (
              <BusStep key={index}>
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
    </RouteWrapper>
  );
};

export default DetailRoute;

const RouteWrapper = styled.div`
  width: 100%;
  & p {
    width: 100%;
    height: 42px;
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
const SubwayStep = styled.div<{ $line: number }>`
  position: relative;
  border-left: ${(props) => `solid 3px #${subwayColor[props.$line] || '000'}`};
  margin-left: 58px;
  & p {
    padding-left: 21px;
    position: relative;
  }
  & p::before {
    position: absolute;
    top: 50%;
    left: -36px;
    transform: translateY(-41%);
    z-index: 1;
    content: '';
    display: inline-block;
    background: url('/assets/icons/ic_sub_white.svg');
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
  }
  & p::after {
    position: absolute;
    top: 0;
    left: -12px;
    content: '';
    background-color: ${(props) => `#${subwayColor[props.$line] || '000'}`};
    width: 23px;
    height: 23px;
    border-radius: 20px;
  }
  & p:last-of-type {
    transform: translateY(21px);
    &::after {
      top: initial;
      bottom: 21px;
    }
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
  left: -78px;
  transform: translateY(-50%);
`;
