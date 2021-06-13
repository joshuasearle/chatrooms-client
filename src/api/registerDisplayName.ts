import axios from 'axios';

import apiPath from './apiPath';

const registerDisplayName = async (
  socket: any,
  displayName: string,
  setRooms: any
) => {
  const res = await axios.post(`${apiPath}/login`, {
    displayName,
    socketId: socket.id,
  });

  setRooms(res.data.rooms);

  return res.data;
};

export default registerDisplayName;
