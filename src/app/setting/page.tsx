/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useRouter } from 'next/navigation';
import ArrowIcon from './ArrowIcon';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';

const menu = ['즐겨찾기 관리', '알람 주기 관리'];

export default function setting() {
  const router = useRouter();

  const navigateToMenu = (text: string) => {
    const [favorite, alarm] = menu;

    if (text === favorite) router.push('/setting/favorites');
    if (text === alarm) router.push('/setting/alarm');
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const text = target.textContent;

    if (text) {
      navigateToMenu(text);
    }
  };

  return (
    <Container>
      <Title>설정</Title>
      <main>
        <ul>
          {menu.map((item, index) => (
            <li key={index} onClick={handleMenuClick}>
              <span>{item}</span>
              <ArrowIcon />
            </li>
          ))}
        </ul>
      </main>
      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 16px;
  > main {
    padding-top: 16px;
    > ul {
      list-style: none;
      > li {
        display: flex;
        justify-content: space-between;
        padding: 20px 16px;
        font-size: 16px;
        line-height: 22px;
        border-bottom: 1px solid #ddd;
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }
`;

const Title = styled.h1`
  padding-top: 70px;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
`;
