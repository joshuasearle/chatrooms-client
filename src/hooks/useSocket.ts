import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import server from '../api/apiPath';

const useSocket = (): [any, boolean] => {
  const [socket, setSocket] = useState<any>(null);
  const connected = socket !== null && socket.connected;
  useEffect(() => {
    const socket = socketIOClient(server);
    socket.on('connect', () => {
      setSocket(socket);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return [socket, connected];
};

export default useSocket;
