import { IAddressProps } from '@/type/search';
import { atom } from 'recoil';

export const searchState = atom({
  key: 'searchValues',
  default: {
    departure: '',
    arrival: '',
  },
});
export const addressesState = atom<IAddressProps[]>({
  key: 'addresses',
  default: [],
});

export const pathResultState = atom({
  key: 'pathResult',
  default: {
    arrival: {
      location: '',
      address: '',
      x: 0,
      y: 0,
    },
    departure: {
      location: '',
      address: '',
      x: 0,
      y: 0,
    },
  },
});
