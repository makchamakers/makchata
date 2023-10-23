import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

const Button = styled.button<{ $isbottomsheetopen?: boolean }>`
  position: ${(props) => (props.$isbottomsheetopen ? 'absolute' : '')};
  top: ${(props) => (props.$isbottomsheetopen ? '-70px' : '')};
  left: ${(props) => (props.$isbottomsheetopen ? '16px' : '')};
  padding: 4px 8px;
  margin: ${(props) => (props.$isbottomsheetopen ? '' : '45px 0 24px')};
  background-color: transparent;
`;
