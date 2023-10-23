import styled from 'styled-components';
import Image from 'next/image';
import icBusBlue from 'public/assets/icons/ic_bus_blue.svg';
import icSubGreen from 'public/assets/icons/ic_sub_green.svg';

export default function CloseInfo() {
  return (
    <Container>
      <Bar />
      <div>
        <Vihicle>
          <div>
            <Image src={icSubGreen} alt="지하철 아이콘" />
            <Image src={icBusBlue} alt="버스 아이콘" />
          </div>
          <p>지하철+버스</p>
        </Vihicle>
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

const Container = styled.div`
  z-index: 10;
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

const Vihicle = styled.div`
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
