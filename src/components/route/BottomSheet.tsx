import styled from 'styled-components';
import TopInfo from '@/components/route/bottomSheet/TopInfo';

export default function BottomSheet() {
  return (
    <Container>
      <TopInfo />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 88px;
`;
