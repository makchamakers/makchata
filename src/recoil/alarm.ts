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
  default: [false, false, false, false, false, false, false],
  effects_UNSTABLE: [persistAtom],
});
