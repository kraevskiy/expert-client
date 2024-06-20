import { Routes, Route } from 'react-router-dom';
import Home from '@/routes/pages/home.tsx';
import { EPaths } from '@/routes/paths.ts';
import Login from '@/routes/pages/login.tsx';
import Chats from '@/routes/pages/chats.tsx';
import Chat from '@/routes/pages/chat.tsx';
import Profile from '@/routes/pages/profile.tsx';

export default function() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={EPaths.login} element={<Login />} />
      <Route path={EPaths.profile} element={<Profile />} />
      <Route path={EPaths.chats}>
        <Route index element={<Chats />} />
        <Route path={EPaths.chatsId} element={<Chat />} />
      </Route>
    </Routes>
  );
}
