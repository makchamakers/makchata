import styled from 'styled-components';
import BackBtn from '@/components/route/common/BackBtn';
import Map from '@/components/route/summary/Map';
import BottomSheet from './BottomSheet';

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
  padding: 0 16px;

  p {
    margin-bottom: 36px;
    color: #242424;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
  }
`;
