import { ItemSlice } from './ItemSlice';
import { AuthSlice } from './AuthSlice';
import { create } from 'zustand/react';
import {
  createSelectors,
  withDevtoolsAndPersist,
} from '@utils/zustand/middlewares';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage } from 'zustand/middleware';

export type CommonStoreInterface = ItemSlice & AuthSlice;

export const CommonStore = create<CommonStoreInterface>()(
  immer(
    withDevtoolsAndPersist(
      (...set) => ({
        ...ItemSlice(...set),
        ...AuthSlice(...set),
      }),
      'common-store',
      {
        partialize: (state) => ({
          items: state.items,
          user: state.user,
        }),
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export const useCommonStore = createSelectors(CommonStore);
