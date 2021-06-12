import axios from 'axios';

import apiPath from './apiPath';

const registerDisplayName = async (socket: any, displayName: string) => {
  const res = await axios.post(`${apiPath}/login`, {
    displayName,
    socketId: socket.id,
  });

  return res.data;
};

export default registerDisplayName;
