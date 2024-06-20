import { MemberSchema } from '@/types/member.schema.ts';

export interface CreateUserSchema {
  name: string;
  username: string;
  image?: string;
}

export interface UserSchema extends Omit<CreateUserSchema, 'image'> {
  id: string;
  image: string | null;
  chats?: UserChat[];
  members?: MemberSchema[];
  createdAt: string;
  updatedAt: string;
}

export interface UserChat {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  profileId: string;
  updatedAt: string;
}
