import styled from 'styled-components';

export default function InputCheckbox({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}

const Container = styled.span`
  input[type='checkbox'] {
    display: none;

    + label {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:before {
        content: '';
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background-image: url('/assets/icons/ic_checkbox_unchecked_gray.svg');
      }
    }

    &:checked {
      + label:before {
        background-image: url('/assets/icons/ic_checkbox_checked_orange.svg');
      }
    }
  }
`;
