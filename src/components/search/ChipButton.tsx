import styled from 'styled-components';
import { MyHomeSVG } from './assets';

interface IChipButton {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const ChipButton = ({ text, onClick, disabled }: IChipButton) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      <MyHomeSVG />
      <p>{text}</p>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  padding: 4px 8px;
  white-space: nowrap;
  align-items: center;
  border-radius: 30px;
  background: #e8ebed;
  border: none;
  font-size: 12px;
`;

export default ChipButton;
