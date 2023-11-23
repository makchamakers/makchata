'use client';

import { useState } from 'react';
import styled from 'styled-components';
import BackBtn from '@/components/route/common/BackBtn';
import Map from '@/components/route/summary/Map';
import BottomSheet from '@/components/route/BottomSheet';
import { ParamsProps } from '@/type/route';

export default function Summary({ params }: ParamsProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  return (
    <Container>
      <Header>
        <BackBtn isBottomSheetOpen={isBottomSheetOpen} />
        <p>
          경로 정보를
          <br />
          한눈에 보여줄게요!
        </p>
      </Header>
      <Map params={params} />
      <BottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

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
