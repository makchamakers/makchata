'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  alarmCheckedState,
  alarmSettingState,
  alarmState,
} from '@/recoil/alarm';

import { ALARM_TIME } from '@/constants/route';
import type { IAlarm } from '@/type/alarm';
import InputCheckbox from '@/components/common/InputCheckbox';
import icCloseGray from 'public/assets/icons/ic_close_gray.svg';

export default function AlarmModal({
  setIsAlarmModalOpen,
}: {
  setIsAlarmModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const setIsAlarmOn = useSetRecoilState(alarmState);
  const [, setAlarmSettingTime] = useRecoilState(alarmSettingState);
  const [alarmChecked, setAlarmChecked] = useRecoilState(alarmCheckedState);

  useEffect(() => {
    setAlarmChecked(alarmChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyAlarmBtn = () => {
    router.push('/');
    setIsAlarmOn(true);
    setAlarmSettingTime(new Date());
  };

  const handleCheckedBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setAlarmChecked((prev: IAlarm[]) => {
      const newAlarmChecked = [...prev];
      newAlarmChecked[index] = {
        ...newAlarmChecked[index],
        checked: e.currentTarget.checked,
      };
      return newAlarmChecked;
    });
  };

  return (
    <Container>
      <div>
        <Title>
          <p>원하는 알람시간을 선택해주세요</p>
          <button type="button" onClick={() => setIsAlarmModalOpen(false)}>
            <Image src={icCloseGray} alt="알람모달 닫기" />
          </button>
        </Title>
        <CheckboxList>
          {ALARM_TIME.map((list, index) => (
            <li key={list}>
              <InputCheckbox>
                <input
                  type="checkbox"
                  id={`frequency-${index}`}
                  checked={alarmChecked[index].checked}
                  onChange={(e) => handleCheckedBox(e, index)}
                />
                <label htmlFor={`frequency-${index}`}>{list}</label>
              </InputCheckbox>
            </li>
          ))}
        </CheckboxList>
        <ApplyAlarm>
          <button type="button" onClick={handleApplyAlarmBtn}>
            선택한 알람 적용하기
          </button>
        </ApplyAlarm>
      </div>
    </Container>
  );
}

const Container = styled.div`
  z-index: 30;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100vh;
  background-color: rgba(36, 36, 36, 0.5);

  > div {
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
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: flex-start;
    background-color: transparent;
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
`;

const ApplyAlarm = styled.div`
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
