import styled from 'styled-components';
import { LocationSVG, XSVG } from './assets';
import Link from 'next/link';

interface IPlaceCard {
  address: string;
  detailAddress: string;
  link: string;
}

const PlaceCard = ({ address, detailAddress, link }: IPlaceCard) => {
  return (
    <Link href={link}>
      <Wrap>
        <LocationSVG />
        <TitleWrap>
          <p>{address}</p>
          <p>{detailAddress}</p>
        </TitleWrap>
        <XSVG size="8" />
      </Wrap>
    </Link>
  );
};

export default PlaceCard;

const Wrap = styled.article`
  display: grid;
  grid-template-columns: 18px 1fr 18px;
  align-items: center;
  gap: 16px;
  padding: 16px 8px;
  border-bottom: 1px solid #eee;
`;

const TitleWrap = styled.div`
  font-size: 14px;

  > p:first-of-type {
    font-weight: 600;
  }

  > p:last-of-type {
    color: var(--Gray_888888, #888);
    font-weight: 400;
  }
`;
