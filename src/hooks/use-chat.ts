import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { MessageSchema } from '@/types/message.schema.ts';
import { ChatSchema } from '@/types/chat.schema.ts';
import { MemberSchema } from '@/types/member.schema.ts';

type ChatStore = {
  chat: null | ChatSchema;
  member: MemberSchema | null;
  messages: MessageSchema[] | null;
}

type ChatAction = {
  getChat: (chatId: string, profileId: string) => Promise<void>;
  getMessages: (chatId: string) => Promise<void>;
  cleanChat: () => void;
  uploadFile: (file: File) => Promise<{
    fileUrl: string;
    message: 'File uploaded successfully';
    ok: boolean
  }>;
}


export const useChat = create<ChatStore & ChatAction>()(
  immer((set) => ({
    chat: null,
    messages: null,
    member: null,
    uploadFile: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      return await res.json();
    },
    cleanChat: () => {
      set((state) => {
        state.chat = null;
        state.messages = null;
        state.member = null;
      });
    },
    getChat: async (chatId, profileId) => {
      try {
        const res = await fetch(`/api/chat/${chatId}`);
        if (res.ok) {
          const chat = await res.json();
          const member = chat.members.find((member: MemberSchema) => member.profileId === profileId);
          set(state => {
            state.chat = chat;
            state.member = member || null;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    getMessages: async (chatId) => {
      try {
        const res = await fetch(`/api/message/by-chat/${chatId}`);
        if (res.ok) {
          const messages = await res.json();
          set(state => {
            state.messages = messages;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  })),
);
