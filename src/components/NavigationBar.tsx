'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import icSettingGray from 'public/assets/icons/ic_setting_gray.svg';
import icHomeGray from 'public/assets/icons/ic_home_gray.svg';
import icUser from 'public/assets/icons/ic_user.svg';
import styled from 'styled-components';

export default function NavigationBar() {
  const activePath = usePathname();
  const isSetting = activePath.includes('/setting');
  const isHome = activePath === '/';
  const isMyPage = activePath === '/mypage';

  return (
    // 컴포넌트가 아니라 svg 파일을 경로로 불러오니 Image 태그에  fill 속성이 먹지 않음
    // 어떤 방법으로 해야할까요..?

    <Container>
      <Link href="/setting">
        <NavLink $active={isSetting}>
          <Image
            src={icSettingGray}
            alt={'설정 페이지로 이동'}
            color={isSetting ? '#FF8048' : '#BBBBBB'}
          />
          <span>설정</span>
        </NavLink>
      </Link>
      <Link href="/">
        <NavLink $active={isHome}>
          <Image
            src={icHomeGray}
            alt={'홈 화면으로 이동'}
            color={isHome ? '#FF8048' : '#BBBBBB'}
          />
          <span>홈</span>
        </NavLink>
      </Link>
      <Link href="/mypage">
        <NavLink $active={isMyPage}>
          <Image
            src={icUser}
            alt={'마이 페이지로 이동'}
            color={isMyPage ? '#FF8048' : '#BBBBBB'}
          />
          <span>마이페이지</span>
        </NavLink>
      </Link>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 88px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 64px 32px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.08);
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
