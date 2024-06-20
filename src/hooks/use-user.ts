import { create } from 'zustand';
import { ELocalStorageKeys } from '../types/local-storage-keys.ts';
import { CreateUserSchema, UserSchema } from '@/types/user.schema.ts';

type UserStore = {
  user: UserSchema | null;
  isInitialLoading: boolean;
};

type UserAction = {
  getUser: () => Promise<void>;
  createUser: (user: CreateUserSchema) => Promise<void>;
  logout: () => void;
};

export const useUser = create<UserStore & UserAction>((set) => ({
  user: null,
  isInitialLoading: true,
  logout: () => {
    localStorage.removeItem(ELocalStorageKeys.user);
    set({ user: null });
  },
  getUser: async () => {
    const storageId = localStorage.getItem(ELocalStorageKeys.user);
    if (!storageId) {
      set({ isInitialLoading: false });
      return;
    }
    await fetch(`/api/profile/${storageId}`).then(async (res) => {
      const result = await res.json();
      if (res.status === 401) {
        set({ isInitialLoading: false });
      } else {
        set({ user: result, isInitialLoading: false });
      }
    }).catch(() => {
      set({ isInitialLoading: false });
    });
  },
  createUser: async (user) => {
    try {
      const res = await fetch('/api/profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const userDB = await res.json();
      localStorage.setItem(ELocalStorageKeys.user, userDB.id);
      set({
        user: userDB,
      });

    } catch (e) {
      console.log(e);
    }
  },
}));
