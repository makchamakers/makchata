import styled from 'styled-components';
import BackBtn from '@/components/route/common/BackBtn';

export default function Summary() {
  return (
    <Container>
      <Header>
        <BackBtn />
        <p>
          경로 정보를
          <br />
          한눈에 보여줄게요!
        </p>
      </Header>
      <Map>이동경로 지도</Map>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.header`
  margin: 45px 0 36px;
  padding: 0 16px;

  p {
    color: #242424;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
  }
`;

const Map = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 453px;
  background-color: #b7b7b7;
`;
