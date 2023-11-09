'use client';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import icCharCrying from 'public/assets/icons/ic_char_crying.svg';

export default function NotFoundPage() {
  return (
    <Container>
      <Title>Error</Title>
      <SubTitle>404</SubTitle>
      <Message>길을 잃어버렸어요!</Message>
      <Image
        src={icCharCrying}
        width={110}
        height={96}
        alt="crying character"
        priority
      />
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
      <Footer>Copyright ⓒ MAKCHAMAKERS Co., LTD. All rights Reserved.</Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 + h2 {
    margin-top: 4px;
  }
  > p {
    margin-top: 16px;
    margin-bottom: 24px;
  }
  > a {
    margin-top: 88px;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  color: #ff8048;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  color: #ff8048;
`;

const Message = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: #888888;
`;

const Button = styled.button`
  width: 358px;
  padding: 13px 10px;
  background-color: #ff8048;
  color: #ffffff;
  border-radius: 14px;
  border: none;
  box-shadow: none;
  cursor: pointer;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 24px;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: #aaaaaa;
  background-color: #f5f5f5;
`;
