'use client';

import { useRecoilState } from 'recoil';
import { testState } from '@/recoil/state';
import styled from 'styled-components';

export default function Home() {
  const [test, setTest] = useRecoilState(testState);

  console.log(test);

  return (
    <Container>
      <Title>Hello Makchata!</Title>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #cb4154;
`;
