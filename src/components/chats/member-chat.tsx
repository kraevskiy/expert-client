import { format } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, ScrollShadow } from '@nextui-org/react';

import { useUser } from '@/hooks/use-user.ts';
import { useChats } from '@/hooks/use-chats.ts';
import { EPaths } from '@/routes/paths.ts';

const MemberChat = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));
  const { getConnectedChats, memberChats } = useChats(useShallow(state => ({
    getConnectedChats: state.getConnectedChats,
    memberChats: state.memberChats,
  })));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getConnectedChats(user.id);
    }
  }, []);

  return (
    <>
      <div className='text-xl font-semibold italic mb-4'>
        Chats where you connected
      </div>
      <ScrollShadow className='w-full h-[300px]'>
        {memberChats?.map((chat) => (
          <Card key={chat.id} className='mb-2'>
            <CardHeader className='flex gap-2 justify-between'>
              <div className='flex flex-col gap-1'>
                <p className='text-md'>{chat.name}</p>
                <p className='text-small text-default-500'><span
                  className='italic'>created - </span>{format(new Date(chat.createdAt), 'HH:MM dd-mm-yyyy')}</p>
              </div>
              <Button color='danger' onClick={() => navigate(`${EPaths.chats}/${chat.id}`)}>
                Open
              </Button>
            </CardHeader>
          </Card>
        ))}
      </ScrollShadow>
    </>
  );
};

export default MemberChat;
