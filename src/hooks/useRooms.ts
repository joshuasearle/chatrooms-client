import { useEffect, useState } from 'react';
import { Room } from '../types';

const useRooms = (socket: any, connected: boolean): [Room[], any] => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (!connected) return;
    socket.on(
      'rooms',
      (socketRooms: Room[]) => {
        setRooms(socketRooms);
      },
      [connected]
    );
  });

  return [rooms, setRooms];
};

export default useRooms;
