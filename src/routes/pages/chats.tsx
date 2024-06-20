import { useShallow } from 'zustand/react/shallow';
import { Divider } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';

import Page from '@/components/page.tsx';
import OwnerChat from '@/components/chats/owner-chat.tsx';
import MemberChat from '@/components/chats/member-chat.tsx';
import AllChat from '@/components/chats/all-chat.tsx';
import CreateChat from '@/components/chats/create-chat.tsx';
import { useUser } from '@/hooks/use-user.ts';
import { EPaths } from '@/routes/paths.ts';

const Chats = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));

  if (!user) {
    return <Navigate to={EPaths.login}/>
  }
  return (
    <Page>
      <Page.Title>Chats</Page.Title>
      <Page.Body>
        <div className='flex flex-col gap-4 mb-5'>
          <CreateChat />
        </div>
        <Divider className='my-4' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex flex-col justify-stretch p-2 px-4 border rounded-md border-foreground-100'>
            <OwnerChat />
          </div>
          <div className='flex flex-col justify-stretch p-2 px-4 border rounded-md border-foreground-100'>
            <MemberChat />
          </div>
          <div className='flex flex-col justify-stretch p-2 px-4 border rounded-md border-foreground-100'>
            <AllChat />
          </div>
        </div>
        {/*{user}*/}
      </Page.Body>
    </Page>
  );
};

export default Chats;
