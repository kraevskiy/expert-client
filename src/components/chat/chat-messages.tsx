import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { useUser } from '@/hooks/use-user.ts';
import { useChat } from '@/hooks/use-chat.ts';
import ChatMessage from './chat-message';
import { useEffect, useRef } from 'react';

const ChatMessages = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const { messages } = useChat(useShallow(state => ({
    messages: state.messages,
  })));
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages])

  if (!chatId) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-1 flex-col overflow-y-auto py-4'>
      <div className='flex-1' />
      <div className='mt-auto flex flex-col-reverse' ref={messageContainerRef}>
        {
          messages?.map(message => <ChatMessage key={message.id} message={message} user={user} />)
        }
      </div>
    </div>
  );
};

export default ChatMessages;
