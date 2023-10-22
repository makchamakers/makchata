'use client';

import { useRouter, usePathname } from 'next/navigation';
import HomeIcon from '@/components/HomeIcon';
import PersonIcon from '@/components/PersonIcon';
import SettingIcon from '@/components/SettingIcon';
import styled from 'styled-components';

type PagePath = '/setting' | '/' | '/mypage';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isSetting = pathname === '/setting';
  const isHome = pathname === '/';
  const isMyPage = pathname === '/mypage';

  const handleNavItemClick = (path: PagePath) => {
    router.push(path);
  };

  return (
    <Container>
      <NavMenu>
        <NavItem
          $active={isSetting}
          onClick={() => handleNavItemClick('/setting')}
        >
          <SettingIcon color={isSetting ? '#FF8048' : '#BBBBBB'} />
          <span>설정</span>
        </NavItem>
        <NavItem $active={isHome} onClick={() => handleNavItemClick('/')}>
          <HomeIcon color={isHome ? '#FF8048' : '#BBBBBB'} />
          <span>홈</span>
        </NavItem>
        <NavItem
          $active={isMyPage}
          onClick={() => handleNavItemClick('/mypage')}
        >
          <PersonIcon color={isMyPage ? '#FF8048' : '#BBBBBB'} />
          <span>마이페이지</span>
        </NavItem>
      </NavMenu>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 8px 64px 32px;
  list-style: none;
`;

const NavItem = styled.li<{ $active: boolean }>`
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
