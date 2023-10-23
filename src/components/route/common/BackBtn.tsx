import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import icArrowBackBlack from 'public/assets/icons/ic_arrow_back_black.svg';
import icArrowBackWhite from 'public/assets/icons/ic_arrow_back_white.svg';

export default function BackBtn({
  isBottomSheetOpen,
}: {
  isBottomSheetOpen: boolean;
}) {
  const router = useRouter();

  const handleBackBtn = () => {
    router.back();
  };

  return (
    <Button
      type="button"
      $isbottomsheetopen={isBottomSheetOpen}
      onClick={handleBackBtn}
    >
      {isBottomSheetOpen ? (
        <Image src={icArrowBackWhite} alt="뒤로가기" />
      ) : (
        <Image src={icArrowBackBlack} alt="뒤로가기" />
      )}
    </Button>
  );
}

const Button = styled.button<{ $isbottomsheetopen: boolean }>`
  padding: 4px 8px;
  margin: ${(props) =>
    props.$isbottomsheetopen ? '45px 0 24px 16px' : '45px 0 24px'};
  background-color: transparent;
`;
