import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const alarmState = atom({
  key: 'alarm',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const alarmCheckedState = atom({
  key: 'alarmChecked',
  default: [
    { text: '막차 탑승하기 1시간 전', checked: false },
    { text: '막차 탑승하기 30분 전', checked: false },
    { text: '막차 탑승하기 10분 전', checked: false },
    { text: '막차 탑승하기 5분 전', checked: false },
    { text: '막차 탑승하기 3분 전', checked: false },
    { text: '막차가 출발지에 도착했을 때', checked: false },
    { text: '막차가 도착지에 도착했을 때', checked: false },
  ],
  effects_UNSTABLE: [persistAtom],
});
