import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { useChat } from '@/hooks/use-chat.ts';
import { useEffect } from 'react';
import { Avatar, Button } from '@nextui-org/react';
import { useUser } from '@/hooks/use-user.ts';

const ChatHeader = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const { chat, getChat } = useChat(useShallow(state => ({
    chat: state.chat,
    getChat: state.getChat,
  })));

  useEffect(() => {
    if (chatId && user) {
      getChat(chatId, user?.id);
    }
  }, []);

  if (!chatId) {
    return null;
  }

  return (
    <div className="text-md flex h-12 justify-between items-center border-b px-3 font-semibold border-foreground-200">
      <div className="flex gap-5">
        <Avatar src={chat?.image || ''} name={chat?.name} />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">{chat?.name}</h4>
          <h5 className="text-small tracking-tight text-default-400">{chat?.members?.length || 0} member(s)</h5>
        </div>
      </div>
      {
        chat?.profileId === user?.id && <Button
          color="primary"
          radius="full"
          size="sm"
        >
          Edit
        </Button>
      }
    </div>
  );
};

export default ChatHeader;
