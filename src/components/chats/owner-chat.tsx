import { useUser } from '@/hooks/use-user.ts';
import { useShallow } from 'zustand/react/shallow';
import { Button, Card, CardHeader, ScrollShadow } from '@nextui-org/react';
import { format } from 'date-fns';
import { EPaths } from '@/routes/paths.ts';
import { useNavigate } from 'react-router-dom';

const OwnerChat = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));
  const navigate = useNavigate();

  return (
    <>
      <div className='text-xl font-semibold italic mb-4'>
        Owners chats
      </div>
      <ScrollShadow className='w-full h-[300px]'>
        {user?.chats?.map((chat) => (
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

export default OwnerChat;
