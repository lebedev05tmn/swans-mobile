import { io } from 'socket.io-client';

const { BASE_URL } = process.env;

const socket = io(BASE_URL, {
    transports: ['websocket'],
    autoConnect: false,
});

export default socket;
