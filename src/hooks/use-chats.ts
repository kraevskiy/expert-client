import { create } from 'zustand';
import { UserChat } from '@/types/user.schema.ts';

type ChatsStore = {
  memberChats: UserChat[] | null;
  allChats: UserChat[] | null;
}
type ChatsAction = {
  getConnectedChats: (withoutUserId: string) => Promise<void>;
  getAllChats: (withoutUserId: string) => Promise<void>;
  createChat: (data: { profileId: string; name: string }) => Promise<void>;
  joinToChat: (data: { chatId: string; profileId: string }) => Promise<void>;
}


export const useChats = create<ChatsStore & ChatsAction>((set) => ({
  memberChats: null,
  allChats: null,
  getConnectedChats: async (withoutUserId) => {
    try {
      const res = await fetch(`/api/chat/member?profileId=${withoutUserId}`);
      const memberChats = await res.json();
      set({
        memberChats,
      });

    } catch (e) {
      console.log(e);
    }
  },
  getAllChats: async (withoutUserId) => {
    try {
      const res = await fetch(`/api/chat/all?profileId=${withoutUserId}`);
      const allChats = await res.json();
      set({
        allChats,
      });

    } catch (e) {
      console.log(e);
    }
  },
  createChat: async (data) => {
    try {
      await fetch(`/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, messages: [] }),
      });
    } catch (e) {
      console.log(e);
    }
  },
  joinToChat: async ({ chatId, profileId }) => {
    try {
      await fetch(`/api/chat/join/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId }),
      });
    } catch (e) {
      console.log(e);
    }
  },
}));
