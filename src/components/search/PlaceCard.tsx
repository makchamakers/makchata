import styled from 'styled-components';
import { LocationSVG } from './assets';
import Link from 'next/link';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  departureAddressesState,
  arrivalAddressesState,
  departureResultState,
  arrivalResultState,
} from '@/recoil/search';
interface IPlaceCard {
  address: string;
  detailAddress: string;
  x: string;
  y: string;
  type: string;
}

const PlaceCard = ({ address, detailAddress, x, y, type }: IPlaceCard) => {
  const [, setDeparture] = useRecoilState(departureResultState);
  const [, setArrival] = useRecoilState(arrivalResultState);

  const saveAddress = () => {
    if (type === 'departure') {
      setDeparture({ address, detailAddress, x, y });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useResetRecoilState(departureAddressesState);
    } else if (type === 'arrival') {
      setArrival({ address, detailAddress, x, y });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useResetRecoilState(arrivalAddressesState);
    }
  };

  return (
    <Link onClick={() => saveAddress()} href={'/'}>
      <Wrap>
        <LocationSVG />
        <TitleWrap>
          <p>{address}</p>
          <p>{detailAddress}</p>
        </TitleWrap>
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
