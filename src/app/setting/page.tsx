'use client';

import Link from 'next/link';
import NavigationBar from '@/components/NavigationBar';
import ArrowIcon from './ArrowIcon';
import styled from 'styled-components';

const menu = [
  { label: '즐겨찾기 관리', href: '/setting/favorites' },
  { label: '알림 주기 관리', href: '/setting/alarm' },
];

export default function setting() {
  return (
    <>
      <Container>
        <Title>설정</Title>
        <main>
          {menu.map(({ label, href }, index) => (
            <Link key={index} href={href}>
              <span>{label}</span>
              <ArrowIcon />
            </Link>
          ))}
        </main>
      </Container>
      <NavigationBar />
    </>
  );
}

const Container = styled.div`
  width: 390px;
  padding: 0 16px;
  > main {
    padding-top: 16px;
    > * {
      display: flex;
      justify-content: space-between;
      padding: 20px 16px;
      font-size: 16px;
      line-height: 22px;
      border-bottom: 1px solid #ddd;
    }
    > :last-child {
      border-bottom: none;
    }
  }
`;

const Title = styled.h1`
  padding-top: 70px;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
`;
