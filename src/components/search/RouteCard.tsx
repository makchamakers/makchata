import styled from 'styled-components';
import { XSVG } from './assets';

interface IRouteCard {
  onClick?: () => void; //TODO
  departure: string;
  arrival: string;
}

const RouteCard = (props: IRouteCard) => {
  const { onClick, departure, arrival } = props;

  return (
    <Wrap onClick={onClick}>
      <Course>
        <p>
          <span>출발지</span> {departure}
        </p>
        <p>
          <span>도착지</span> {arrival}
        </p>
      </Course>
      <XSVG size="8" />
    </Wrap>
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
  font-size: 14px;
  line-height: 20px;

  span {
    font-weight: 600;
    padding-right: 10px;
  }
`;