import { IResultProps } from '@/type/search';
import {
  formattingBoardingTime,
  formattingTimeTaken,
  formattingRemainTime,
} from '@/utils/time/boardingTime';
import Link from 'next/link';
import styled from 'styled-components';

const ResultCard = ({
  type,
  totalTime,
  totalDistance,
  subPath,
  index,
  lastBoardingTime,
}: IResultProps) => {
  const formattingTime = formattingBoardingTime(lastBoardingTime);
  const formattingTaken = formattingTimeTaken(totalTime);
  const remainTime = formattingRemainTime(lastBoardingTime, totalTime);
  return (
    <Link prefetch={false} href={`/route/${index.toString()}`}>
      <Wrap>
        <Header>
          <Type>{type}</Type>
          <Right>
            <p>
              막차 시간 <span>{formattingTime}</span>
            </p>
            <p>
              소요 시간 <span>{formattingTaken}</span>
            </p>
          </Right>
        </Header>
        <RouteBar>
          {subPath.map(({ distance, trafficType, sectionTime }, i) => {
            return (
              <div key={i}>
                {trafficType === '도보' && (
                  <WorkBar
                    distance={
                      Number((distance / totalDistance).toFixed(4)) * 1000
                    }
                  ></WorkBar>
                )}
                {trafficType === '지하철' && (
                  <SubwayBar
                    distance={
                      Number((distance / totalDistance).toFixed(4)) * 1000
                    }
                  >{`${sectionTime}분`}</SubwayBar>
                )}
                {trafficType === '버스' && (
                  <BusBar
                    distance={
                      Number((distance / totalDistance).toFixed(4)) * 1000
                    }
                  >{`${sectionTime}분`}</BusBar>
                )}
              </div>
            );
          })}
        </RouteBar>
        <DepartureText>
          <span>{remainTime}</span> 뒤에 출발해야해요
        </DepartureText>
      </Wrap>
    </Link>
  );
};

export default ResultCard;

const Wrap = styled.article`
  background-color: white;
  padding: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--Gray_666666, #666);
  align-items: center;

  > p {
    display: flex;
    height: 10px;
    align-items: center;
    padding: 0 10px;
  }

  > p:first-of-type {
    border-right: 1px solid #ccc;
  }
  span {
    font-weight: 700;
    padding-left: 2px;
  }
`;

const Type = styled.h1`
  color: var(--Black, #242424);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
`;

const RouteBar = styled.div`
  display: flex;
  width: 100%;
  height: 14px;
  border-radius: 100px;
  background: var(--Gray_dddddd, #eee);
  margin: 24px 0;
`;

const DepartureText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--Black, #242424);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */

  > span {
    font-size: 24px;
    font-weight: 700;
    line-height: 34px; /* 141.667% */
    padding-right: 2px;
  }
`;

const WorkBar = styled.div<{ distance: number }>`
  display: flex;
  width: ${({ distance }) => distance}%;
  background-color: #eeeeee;
  justify-content: center;
  margin: 0 5px;
  border-radius: 10px;
  font-size: 10px;
  color: white;
`;

const SubwayBar = styled(WorkBar)<{ distance: number }>`
  display: flex;
  width: ${({ distance }) => distance}%;
  background-color: #3cb44a;
`;

const BusBar = styled(WorkBar)<{ distance: number }>`
  width: ${({ distance }) => distance}%;
  background-color: #f06e00;
`;
