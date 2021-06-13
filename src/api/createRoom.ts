import axios from 'axios';

import apiPath from './apiPath';

const createRoom = async (socket: any, roomName: string) => {
  const res = await axios.post(`${apiPath}/room`, {
    roomName,
    socketId: socket.id,
  });

  return res.data;
};

export default createRoom;
