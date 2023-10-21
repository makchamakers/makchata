'use client';

import styled from 'styled-components';

export default function Home() {
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
