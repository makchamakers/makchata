import Image from 'next/image';
import styled from 'styled-components';
import icCloseGray from 'public/assets/icons/ic_close_gray.svg';
import { ALARM_TIME } from '@/constatns/route';
import { useRouter } from 'next/navigation';

export default function AlarmModal({
  setIsAlarmModalOpen,
}: {
  setIsAlarmModalOpen: (args: boolean) => void;
}) {
  const router = useRouter();
  const handleApplyAlarmBtn = () => {
    router.push('/');
  };

  return (
    <Container>
      <Title>
        <p>원하는 알람시간을 선택해주세요</p>
        <button type="button" onClick={() => setIsAlarmModalOpen(false)}>
          <Image src={icCloseGray} alt="알람모달 닫기" />
        </button>
      </Title>
      <CheckboxList>
        {ALARM_TIME.map((list, index) => (
          <li key={list}>
            <label htmlFor={`frequency-${index}`}>
              <input type="checkbox" id={`frequency-${index}`} />
              {list}
            </label>
          </li>
        ))}
      </CheckboxList>
      <ApplayAlarm>
        <button type="button" onClick={handleApplyAlarmBtn}>
          선택한 알람 적용하기
        </button>
      </ApplayAlarm>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;

  width: 390px;
  padding: 32px 16px 34px 16px;
  border-radius: 16px 16px 0px 0px;
  background-color: #fff;

  p {
    margin-bottom: 20px;

    color: #444;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: flex-start;
  }
`;

const CheckboxList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 32px;

  color: #666;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;

  li {
    input[type='checkbox'] {
      margin-right: 10px;
    }
  }
`;

const ApplayAlarm = styled.div`
  button {
    width: 358px;
    padding: 13px 10px;

    border-radius: 14px;
    background-color: #ff8048;

    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }
`;
