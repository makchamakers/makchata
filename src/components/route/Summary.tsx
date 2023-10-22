import styled from 'styled-components';
import BackBtn from '@/components/route/common/BackBtn';
import Map from '@/components/route/summary/Map';
import BottomSheet from '@/components/route/BottomSheet';

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
      <Map />
      <BottomSheet />
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
