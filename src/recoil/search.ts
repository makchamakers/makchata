import { atom } from 'recoil';

export interface AddressProps {
  address_name: string;
  phone: string;
  place_name: string;
  x: string;
  y: string;
}

export const departureAddressesState = atom<AddressProps[]>({
  key: 'departureAddresses',
  default: [],
});

export const arrivalAddressesState = atom<AddressProps[]>({
  key: 'arrivalAddresses',
  default: [],
});

export const departureInputState = atom({
  key: 'departureInput',
  default: '',
});

export const arrivalInputState = atom({
  key: 'arrivalInput',
  default: '',
});

export const departureResultState = atom({
  key: 'departureResult',
  default: {
    address: '',
    detailAddress: '',
    x: '',
    y: '',
  },
});

export const arrivalResultState = atom({
  key: 'arrivalResult',
  default: {
    address: '',
    detailAddress: '',
    x: '',
    y: '',
  },
});

export const selectedPathIndexState = atom({
  key: 'selectedPathIndexState',
  default: 0,
});
