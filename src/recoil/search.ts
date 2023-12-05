import { IAddressProps, IPathProps } from '@/type/search';
import { DefaultValue, atom, selector, RecoilEnv } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { recoilPersist } from 'recoil-persist';

//Next.js 개발 환경에서 Recoil을 사용하면 파일이 변경되어 다시 빌드되는 과정에서 atom으로 만든 state가 재선언된다.
//재선언되는 과정에서 이미 key로 선언된 값을 key로 사용해서 문제가 발생하기 때문에
// 해결하기 위해 Env 추가
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
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

export const remainPathSelector = selector({
  key: 'remainPathSelector',
  get: ({ get }) => {
    const remainPath = get(remainPathState);
    return remainPath.map((path) => ({ id: uuidv4(), ...path }));
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(
        remainPathState,
        newValue.map(({ id, ...path }) => path)
      );
    }
  },
});
