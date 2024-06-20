import { useUser } from '@/hooks/use-user.ts';
import { useShallow } from 'zustand/react/shallow';
import { Navigate } from 'react-router-dom';
import { EPaths } from '@/routes/paths.ts';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { CreateUserSchema } from '@/types/user.schema.ts';
import Page from '@/components/page.tsx';

const Login = () => {
  const { user, createUser } = useUser(useShallow((state) => ({
    user: state.user,
    createUser: state.createUser,
  })));
  const [newUser, setNewUser] = useState<CreateUserSchema>({
    name: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await createUser(newUser);
  };

  if (user) {
    return <Navigate to={EPaths.chats} replace />;
  }

  return (
    <Page>
      <Page.Title className="max-w-md mx-auto">
        Create
      </Page.Title>
      <Page.Body className='flex flex-col max-w-md gap-4 mx-auto'>
        <Input
          type='email'
          value={newUser.name}
          onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
          label='Name'
        />
        <Input
          type='email'
          value={newUser.username}
          onChange={e => setNewUser(prev => ({ ...prev, username: e.target.value }))}
          label='Username'
          placeholder='Enter your username'
        />
        <Button color='primary' onClick={handleClick} isLoading={loading}>
          Submit
        </Button>
      </Page.Body>
    </Page>
  );
};

export default Login;
