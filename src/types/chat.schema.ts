import { MemberSchema } from '@/types/member.schema.ts';

export interface ChatSchema {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  profileId: string;
  updatedAt: string;
  members: MemberSchema[];
}
