'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import icSettingGray from 'public/assets/icons/ic_setting_gray.svg';
import icLocationOrange from 'public/assets/icons/ic_location_orange.png';
import icUser from 'public/assets/icons/ic_user.svg';
import styled from 'styled-components';

export default function NavigationBar() {
  const activePath = usePathname();
  const isSetting = activePath.includes('/setting');
  const isHome = activePath === '/';
  const isMyPage = activePath === '/mypage';

  return (
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
      <CircleWrapper>
        <Circle>
          <Link href="/">
            <NavLink $active={isHome}>
              <Image
                src={icLocationOrange}
                alt={'홈 화면으로 이동'}
                color={isHome ? '#FF8048' : '#BBBBBB'}
                width={24}
                height={28}
              />
            </NavLink>
          </Link>
        </Circle>
      </CircleWrapper>
      <CircleText $active={isHome}>막차 찾기</CircleText>
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

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 50px;
  padding: 14px;
  border-radius: 50%;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.08);
`;

const CircleText = styled.span<{ $active: boolean }>`
  position: absolute;
  bottom: 30px;
  white-space: nowrap;
  font-size: 12px;
  line-height: 18px;
  color: ${({ $active }) => ($active ? '#FF8048' : '#BBBBBB')};
`;
