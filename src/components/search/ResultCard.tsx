import styled from 'styled-components';

interface IResultCard {
  onClick?: () => void; //TODO
}

const ResultCard = (props: IResultCard) => {
  const { onClick } = props;

  return (
    <Wrap onClick={onClick}>
      <Header>
        <Type>지하철</Type>
        <Right>
          <p>
            막차 시간 <span>AM00:11</span>
          </p>
          <p>
            소요 시간 <span>1시간 31분</span>
          </p>
        </Right>
      </Header>
      <RouteBar></RouteBar>
      <DepartureText>
        <span>16</span>분 뒤에 출발해야해요
      </DepartureText>
    </Wrap>
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
