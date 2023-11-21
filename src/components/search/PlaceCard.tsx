import styled from 'styled-components';
import { LocationSVG } from './assets';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addressesState, pathResultState } from '@/recoil/search';
interface IPlaceCard {
  address: string;
  detailAddress: string;
  x: string;
  y: string;
  type: string;
}

const PlaceCard = ({ address, detailAddress, x, y, type }: IPlaceCard) => {
  const [path, setPath] = useRecoilState(pathResultState);
  const resetPath = useResetRecoilState(addressesState);

  const saveAddress = () => {
    if (type === 'departure') {
      setPath({ ...path, departure: { address, detailAddress, x, y } });
      resetPath();
    } else if (type === 'arrival') {
      setPath({ ...path, arrival: { address, detailAddress, x, y } });
      resetPath();
    }
  };

  return (
    <Button onClick={() => saveAddress()}>
      <Wrap>
        <LocationSVG />
        <TitleWrap>
          <p>{address}</p>
          <p>{detailAddress}</p>
        </TitleWrap>
      </Wrap>
    </Button>
  );
};

export default PlaceCard;

const Button = styled.button`
  cursor: pointer;
  background-color: white;
  border: none;
`;

const Wrap = styled.article`
  display: flex;
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
    margin-bottom: 8px;
    text-align: left;
  }

  > p:last-of-type {
    color: var(--Gray_888888, #888);
    font-weight: 400;
    text-align: left;
  }
`;
