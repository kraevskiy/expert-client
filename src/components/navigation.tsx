import { Button, Divider } from '@nextui-org/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/use-user.ts';
import { EPaths } from '@/routes/paths.ts';
import ThemeSwitcher from '@/components/switchers/theme-switcher.tsx';

const Navigation = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className='flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22] bg-[#E3E5E8]'>
      <div className='flex-1 flex flex-col space-y-4'>
        <Button color='primary' variant={location.pathname === EPaths.home ? 'bordered' : 'shadow'} onClick={() => {
          navigate(EPaths.home);
        }}>
          Home
        </Button>
        {
          user ?
            <>
              <Button
                color='primary'
                variant={location.pathname.includes(EPaths.chats, 0) ? 'bordered' : 'shadow'}
                onClick={() => {
                  navigate(EPaths.chats);
                }}>
                Chats
              </Button>
              <Button
                color='primary'
                variant={location.pathname.includes(EPaths.profile, 0) ? 'bordered' : 'shadow'}
                onClick={() => {
                  navigate(EPaths.profile);
                }}>
                Profile
              </Button>
              <Button
                color='primary'
                variant={'shadow'}
                onClick={() => {
                  logout();
                }}>
                Logout
              </Button>
            </>
            :
            <Button
              color='primary'
              variant={location.pathname.includes(EPaths.login, 0) ? 'bordered' : 'shadow'}
              onClick={() => {
                navigate(EPaths.login);
              }}>
              Login
            </Button>
        }
      </div>
      <Divider className='w-full rounded-md' />
      <div className='mt-auto flex items-center gap-y-4'>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navigation;
