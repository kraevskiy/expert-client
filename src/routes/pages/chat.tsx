import { Navigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { useUser } from '@/hooks/use-user.ts';
import { EPaths } from '@/routes/paths.ts';
import Page from '@/components/page.tsx';
import ChatHeader from '@/components/chat/chat-header.tsx';
import ChatMessages from '@/components/chat/chat-messages.tsx';
import ChatInput from '@/components/chat/chat-input.tsx';
import ChatProvider from '@/providers/chat-provider.tsx';

const Chat = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));
  const { chatId } = useParams();

  if (!user) {
    return <Navigate to={EPaths.login} replace />;
  }

  if (!chatId) {
    return <Navigate to={EPaths.chats} replace />;
  }

  return (
    <ChatProvider>
      <Page className='flex h-svh flex-col'>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </Page>
    </ChatProvider>
  );
};

export default Chat;
