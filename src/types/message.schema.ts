import { MemberSchema } from '@/types/member.schema.ts';
import { UserSchema } from '@/types/user.schema.ts';

export interface CreateMessageSchema {
  content: string;
  fileUrl?: string;
  memberId: string;
  chatId: string;
}

export interface MessageSchema {
  id: string;
  content: string;
  fileUrl: string | null;
  member: MemberSchema & { profile: Omit<UserSchema, 'members' | 'chats'> };
  chat: {};
  createdAt: string;
  updatedAt: string;
}
