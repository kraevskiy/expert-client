import { useUser } from '@/hooks/use-user.ts';
import { Navigate } from 'react-router-dom';
import { EPaths } from '@/routes/paths.ts';
import { useShallow } from 'zustand/react/shallow';
import Page from '@/components/page.tsx';

const Profile = () => {
  const { user } = useUser(useShallow((state) => ({
    user: state.user,
  })));

  if (!user) {
    return <Navigate to={EPaths.login} replace />;
  }

  return (
    <Page>
      <Page.Title>
        Profile
      </Page.Title>
      <Page.Body>
        <p className='text-medium'>Name: <span className='font-semibold'>{user.name}</span></p>
        <p className='text-medium'>Username: <span className='font-semibold'>{user.username}</span></p>
      </Page.Body>
    </Page>
  );
};

export default Profile;
