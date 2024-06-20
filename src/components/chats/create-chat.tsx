import { useShallow } from 'zustand/react/shallow';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

import { useUser } from '@/hooks/use-user.ts';
import { useChats } from '@/hooks/use-chats.ts';

const CreateChat = () => {
  const { user, getUser } = useUser(useShallow((state) => ({
    user: state.user,
    getUser: state.getUser,
  })));
  const { createChat } = useChats();
  const [chatName, setChatName] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleCreateChat = async () => {
    if (user) {
      setLoadingCreate(true);
      await createChat({
        profileId: user.id,
        name: chatName,
      });
      await getUser();
      setLoadingCreate(false);
      setChatName('');
    }
  };

  return (
    <>
      <p>Create chat</p>
      <div className='flex gap-2'>
        <Input label='Chat name' size='sm' value={chatName} onChange={(e) => setChatName(e.target.value)} />
        <Button size='lg' color='success' isLoading={loadingCreate} onClick={handleCreateChat}>
          Create chat
        </Button>
      </div>
    </>
  );
};

export default CreateChat;
