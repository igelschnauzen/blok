import { io } from 'socket.io-client';

const URL = 'http://5.35.100.88:3000/';

export const socket = io(URL);