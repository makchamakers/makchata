'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@/components/HomeIcon';
import PersonIcon from '@/components/PersonIcon';
import SettingIcon from '@/components/SettingIcon';
import styled from 'styled-components';

export default function NavigationBar() {
  const activePath = usePathname();
  const isSetting = activePath === '/setting';
  const isHome = activePath === '/';
  const isMyPage = activePath === '/mypage';

  return (
    <Container>
      <Link href="/setting">
        <NavLink $active={isSetting}>
          <SettingIcon color={isSetting ? '#FF8048' : '#BBBBBB'} />
          <span>설정</span>
        </NavLink>
      </Link>
      <Link href="/">
        <NavLink $active={isHome}>
          <HomeIcon color={isHome ? '#FF8048' : '#BBBBBB'} />
          <span>홈</span>
        </NavLink>
      </Link>
      <Link href="/mypage">
        <NavLink $active={isMyPage}>
          <PersonIcon color={isMyPage ? '#FF8048' : '#BBBBBB'} />
          <span>마이페이지</span>
        </NavLink>
      </Link>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 64px 32px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const NavLink = styled.div<{ $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    position: absolute;
    bottom: -18px;
    white-space: nowrap;
    font-size: 12px;
    line-height: 18px;
    color: ${({ $active }) => ($active ? '#FF8048' : '#BBBBBB')};
  }
`;
