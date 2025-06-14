import { StateCreator } from 'zustand';

export interface AuthSlice {
  user: { userId: string } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  setUser: (user: { userId: string }) => void;
  setStatus: (status: 'loading' | 'authenticated' | 'unauthenticated') => void;
}

export const AuthSlice: StateCreator<AuthSlice, [], []> = (set) => ({
  user: null,
  status: 'loading',
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
});
