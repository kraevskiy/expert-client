import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { format } from 'date-fns';
import { Button, Card, CardHeader, ScrollShadow } from '@nextui-org/react';

import { useChats } from '@/hooks/use-chats.ts';
import { useUser } from '@/hooks/use-user.ts';

const AllChat = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));
  const { getAllChats, allChats, getConnectedChats, joinToChat } = useChats(useShallow(state => ({
    getAllChats: state.getAllChats,
    allChats: state.allChats,
    getConnectedChats: state.getConnectedChats,
    joinToChat: state.joinToChat,
  })));

  useEffect(() => {
    if (user) {
      getAllChats(user.id);
    }
  }, []);

  const handleJoin = async (chatId: string) => {
    if (user) {
      await joinToChat({
        chatId,
        profileId: user.id,
      });
      getConnectedChats(user.id);
      getAllChats(user.id);
    }
  };

  return (
    <>
      <div className='text-xl font-semibold italic mb-4'>
        All chats
      </div>
      <ScrollShadow className='w-full h-[300px]'>
        {allChats?.map((chat) => (
          <Card key={chat.id} className='mb-2'>
            <CardHeader className='flex gap-2 justify-between'>
              <div className='flex flex-col gap-1'>
                <p className='text-md'>{chat.name}</p>
                <p className='text-small text-default-500'><span
                  className='italic'>created - </span>{format(new Date(chat.createdAt), 'HH:MM dd-mm-yyyy')}</p>
              </div>
              <Button color='danger' onClick={() => handleJoin(chat.id)}>
                Join
              </Button>
            </CardHeader>
          </Card>
        ))}
      </ScrollShadow>
    </>
  );
};

export default AllChat;
