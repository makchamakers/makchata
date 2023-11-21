import { IAddressProps } from '@/type/search';
import { atom } from 'recoil';

export const addressesState = atom<IAddressProps[]>({
  key: 'addresses',
  default: [],
});

export const pathResultState = atom({
  key: 'pathResult',
  default: {
    arrival: {
      address: '',
      detailAddress: '',
      x: '',
      y: '',
    },
    departure: {
      address: '',
      detailAddress: '',
      x: '',
      y: '',
    },
  },
});
