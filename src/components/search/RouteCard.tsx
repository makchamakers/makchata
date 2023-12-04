import styled from 'styled-components';
import icX from 'public/assets/icons/ic_x_sm.png';
import Link from 'next/link';
import { IRouteCard } from '@/type/search';
import Image from 'next/image';

const RouteCard = (props: IRouteCard) => {
  const { link, departure, arrival } = props;

  return (
    <Link href={link}>
      <Wrap>
        <Course>
          <p>
            <span>출발지</span> {departure}
          </p>
          <p>
            <span>도착지</span> {arrival}
          </p>
        </Course>
        <Image src={icX} alt="저장된 경로 삭제" />
      </Wrap>
    </Link>
  );
};
export default RouteCard;

const Wrap = styled.article`
  width: 100%;
  padding: 16px 24px;
  margin-bottom: 6px;
  gap: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 14px;
  background: var(--Gray_f9f9f9, #f9f9f9);
`;

const Course = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;

  span {
    font-weight: 600;
    padding-right: 10px;
  }
`;
