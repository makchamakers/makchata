import styled from 'styled-components';
import { LocationSVG } from './assets';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addressesState, pathResultState, searchState } from '@/recoil/search';
interface IPlaceCard {
  address: string;
  detailAddress: string;
  x: number;
  y: number;
  type: string;
}

const PlaceCard = ({ address, detailAddress, x, y, type }: IPlaceCard) => {
  const [path, setPath] = useRecoilState(pathResultState);
  const resetPath = useResetRecoilState(addressesState);
  const [search, setSearch] = useRecoilState(searchState);

  const saveAddress = () => {
    if (type === 'departure') {
      setPath({ ...path, departure: { address, detailAddress, x, y } });
      setSearch({ ...search, departure: detailAddress });
      resetPath();
    } else if (type === 'arrival') {
      setPath({ ...path, arrival: { address, detailAddress, x, y } });
      setSearch({ ...search, arrival: detailAddress });
      resetPath();
    }
  };

  return (
    <Button onClick={() => saveAddress()}>
      <Wrap>
        <LocationSVG />
        <TitleWrap>
          <p>{detailAddress}</p>
          <p>{address}</p>
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
