import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import '@/index.css';
import Routes from '@/routes';
import { useUser } from '@/hooks/use-user.ts';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Navigation from '@/components/navigation.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const { getUser, isInitialLoading } = useUser(useShallow((state) => ({
    getUser: state.getUser,
    isInitialLoading: state.isInitialLoading,
  })));

  useEffect(() => {
    getUser();
  }, []);

  if (isInitialLoading) {
    return 'loading';
  }

  return (
    <BrowserRouter>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <div className='h-full'>
            <div className='fixed inset-y-0 z-30 h-full w-[100px] flex-col border-r-1 border-foreground-100'>
              <Navigation />
            </div>
          </div>
          <main className='flex flex-col h-full pl-[110px]'>
            <Routes />
          </main>
        </NextThemesProvider>
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
