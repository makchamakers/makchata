import { atom } from 'recoil';

export const testState = atom({
  key: 'test',
  default: ['t', 'e', 's', 't'],
});
