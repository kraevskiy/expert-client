import { useShallow } from 'zustand/react/shallow';
import { Paperclip, ShieldAlert, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, Tooltip } from '@nextui-org/react';

import { MessageSchema } from '@/types/message.schema.ts';
import { UserSchema } from '@/types/user.schema.ts';
import { useChat } from '@/hooks/use-chat.ts';

const ChatMessage = ({ message, user }: { message: MessageSchema, user: UserSchema }) => {
  const { chat } = useChat(useShallow(state => ({
    chat: state.chat,
  })));
  const isAuthor = message.member.profileId === user.id;
  const isAdmin = !(message.member.profileId === chat?.profileId);
  const canDelete = (isAuthor || isAdmin);

  return (
    <div className='relative flex w-full items-center p-4 transition hover:dark:bg-[#1E1F22] hover:bg-[#E3E5E8] '>
      <div className='group flex w-full items-center gap-x-2'>
        <div
          className='cursor-pointer transition hover:drop-shadow-md'
        >
          <Avatar src={message.member.profile.image || ''} name={message.member.profile.name} />
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex items-center gap-x-2'>
            <div className='flex items-center gap-x-2'>
              <p
                className='cursor-pointer text-sm font-semibold hover:underline'
              >
                {message.member.profile.name}
              </p>
              {isAdmin && <>
                <Tooltip content='Admin'>
                  <ShieldAlert className='h-4 w-4 text-rose-500' />
                </Tooltip>
              </>}
            </div>
            <span className='text-xs text-zinc-500 dark:text-zinc-400'>
              {format(
                new Date(message.createdAt),
                'd MMM yyyy, HH:mm',
              )}
            </span>
          </div>
          <p
            className='text-sm'
          >
            {message.content}
            <br/>
            {message.fileUrl && (
              <a
                href={import.meta.env.VITE_SERVER_URL + message.fileUrl}
                target='_blank'
                rel='noopener noreferrer'
                className="cursor-pointer flex gap-1"
              >
                <Paperclip />
              </a>
            )}
          </p>
        </div>
      </div>
      {canDelete && <div
        className='absolute -top-2 right-5 items-center rounded-md border p-1'>
        <Tooltip content='Delete'>
          <Trash
            className='h-4 w-4 cursor-pointer'
          />
        </Tooltip>
      </div>}
    </div>
  );
};

export default ChatMessage;
