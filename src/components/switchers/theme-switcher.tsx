import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function () {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected={theme === 'dark'}
      onValueChange={(e) => {
        setTheme(e ? 'dark' : 'light');
      }}
      startContent={<Sun className={`w-[1.2rem] h-[1rem]`} />}
      endContent={<Moon className={`w-[1.2rem] h-[1rem]`} />}
    />
  );
}
