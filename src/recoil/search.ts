import { IAddressProps, IPathProps } from '@/type/search';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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

export const remainPathState = atom<IPathProps[]>({
  key: 'remainResult',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
