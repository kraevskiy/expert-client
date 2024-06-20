import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
  autoConnect: false,
});

export const useSocket = create<Socket>()(() => socket);
