import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const alarmState = atom({
  key: 'alarm',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
