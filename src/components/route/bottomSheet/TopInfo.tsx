import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import icBusBlue from 'public/assets/icons/ic_bus_blue.svg';
import icSubGreen from 'public/assets/icons/ic_sub_green.svg';

export default function TopInfo({
  setIsBottomSheetOpen,
}: {
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleTopInfo = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  console.log(mockData);

  return (
    <Container onClick={handleTopInfo}>
      <Bar />
      <div>
        <Vehicle>
          <div>
            <Image src={icSubGreen} alt="지하철 아이콘" />
            <Image src={icBusBlue} alt="버스 아이콘" />
          </div>
          <p>지하철+버스</p>
        </Vehicle>
        <TextInfo>
          <ul>
            <li>
              <span>막차시간 </span>
              <span>AM00:11</span>
            </li>
            <span></span>
            <li>
              <span>소요시간 </span>
              <span>1시간 31분</span>
            </li>
          </ul>
          <p>
            <span>16분</span> 뒤에 출발해야해요
          </p>
        </TextInfo>
      </div>
    </Container>
  );
}

const mockData = {
  type: '지하철', // 지하철, 지하철+버스, 버스 중 하나
  totalTime: 102,
  totalDistance: 50337,
  payment: 1900,
  lastBoardingTime: '2021-10-28T05:18:51.868Z',
  subPath: [
    {
      trafficType: '도보',
      distance: 656,
      sectionTime: 10,
    },
    {
      trafficType: '지하철',
      distance: 28900,
      startName: '정자',
      endName: '왕십리',
      stationCount: 20,
      sectionTime: 46,
      door: '1-3',
    },
    {
      trafficType: '도보',
      distance: 0,
      sectionTime: 0,
    },
    {
      trafficType: '지하철',
      distance: 20600,
      startName: '왕십리',
      endName: '신정',
      stationCount: 21,
      sectionTime: 43,
      door: 'null',
      lastTime: '244200',
    },
    {
      trafficType: '도보',
      distance: 181,
      sectionTime: 3,
    },
  ],
};

const Container = styled.div`
  z-index: 20;
  padding: 10px 16px 20px;
  border-radius: 16px 16px 0 0;
  background-color: #f5f5f5;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.08);

  > div {
    display: flex;
    gap: 28px;
  }
`;

const Bar = styled.div`
  width: 64px;
  height: 6px;
  margin: 0 auto 20px;
  border-radius: 10px;
  background-color: #ccc;
`;

const Vehicle = styled.div`
  > div {
    margin-bottom: 6px;
  }

  > p {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > ul {
    display: flex;
    align-items: center;
    gap: 8px;

    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    > li {
      span:last-of-type {
        color: #ff8048;
        font-weight: 700;
      }
    }

    > span {
      width: 1px;
      height: 10px;
      background-color: #ccc;
    }
  }

  > p {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    > span {
      color: #ff8048;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 34px;
    }
  }
`;
