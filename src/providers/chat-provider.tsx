import { useEffect } from 'react';
import { useChat } from '@/hooks/use-chat.ts';
import { useShallow } from 'zustand/react/shallow';
import { useParams } from 'react-router-dom';
import { useSocket } from '@/hooks/use-socket.ts';

export default function ChatProvider(
  { children }: {
    children: React.ReactNode
  },
) {
  const socket = useSocket();
  const { getMessages, cleanChat } = useChat(useShallow(state => ({
    member: state.member,
    getMessages: state.getMessages,
    cleanChat: state.cleanChat,
  })));

  const { chatId } = useParams();

  useEffect(() => {
    if (!chatId) {
      return;
    }
    socket.connect();
    socket.emit('joinToChat', {
      chatId,
    });
    socket.on('newMessage', () => {
      getMessages(chatId);
    });
    getMessages(chatId);
    return () => {
      socket.disconnect();
      cleanChat();
    };
  }, [chatId]);

  // useEffect(() => {
  //   if (!chatId) {
  //     return;
  //   }
  //   if (socket) {
  //     socket.emit('joinToChat', {
  //       chatId,
  //     });
  //     socket.on('newMessage', () => {
  //       getMessages(chatId);
  //     });
  //   }
  // }, [chatId]);

  return <>{children}</>;
}
