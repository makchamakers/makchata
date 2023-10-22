import { styled } from 'styled-components';

const Input = ({ defaultLocation }: { defaultLocation: string }) => {
  return (
    <div>
      <StartInput defaultValue={defaultLocation} />
    </div>
  );
};

export default Input;

const StartInput = styled.input`
  display: flex;
  padding: 12px 64px 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;