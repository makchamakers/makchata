import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import icArrowBackBlack from 'public/assets/icons/ic_arrow_back_black.svg';

export default function BackBtn() {
  const router = useRouter();

  const handleBackBtn = () => {
    router.back();
  };

  return (
    <Button type="button" onClick={handleBackBtn}>
      <Image src={icArrowBackBlack} alt="뒤로가기" />
    </Button>
  );
}

const Button = styled.button`
  padding: 4px 8px;
  margin-bottom: 24px;
  background-color: transparent;
`;
