'use client';
import NavigationBar from '@/components/NavigationBar';
import Image from 'next/image';
import styled from 'styled-components';
import icExclamationMark from 'public/assets/icons/ic_exclamationMark_gray.svg';
import icCharDefault from 'public/assets/icons/ic_char_default.png';
import DetailRoute from '@/components/main/DetailRoute';
import AlarmCardComponent from '@/components/main/AlarmCard';
import { useRecoilState } from 'recoil';
import { alarmState } from '@/recoil/alarm';
import SetAlaramCardComponent from '@/components/main/SetAlaramCard';

export default function Home() {
  const [alarm] = useRecoilState(alarmState);
  return (
    <Container>
      <TitleWrapper>
        <Title>
          <span>막차타</span>랑 같이
          <br />
          막차타요
        </Title>
        <Image
          src={icCharDefault}
          width={110}
          height={96}
          alt="막차타일러스트"
          priority
        />
      </TitleWrapper>
      <ContentWrapper>
        {alarm ? <AlarmCardComponent /> : <SetAlaramCardComponent />}

        <RouteWrap>
          {alarm === false ? (
            <InfoBox>
              <Image
                src={icExclamationMark}
                alt="alert이미지"
                width={40}
                height={40}
                priority
              />
              <p>막차 알림을 설정하면 경로가 나타나요</p>
            </InfoBox>
          ) : (
            <>
              <h3>오늘 꼭 타야하는 막차 경로</h3>
              <DetailRoute index={0} />
            </>
          )}
        </RouteWrap>
        <NavigationBar />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #ffd9c9;
  color: #242424;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 69px 16px 0;
`;

const Title = styled.h1`
  font-weight: 300;
  & > span {
    font-weight: 700;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  top: 100px;
  width: 100%;
  height: calc(100% - 265px);
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-top: 116px;
  padding-bottom: 88px;
`;

const RouteWrap = styled.div`
  padding-left: 16px;
  height: 100%;
  h3 {
    margin-bottom: 16px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 84px;
  & img {
    margin-bottom: 14px;
  }
  & p {
    color: #aaa;
    font-weight: 300;
  }
`;
