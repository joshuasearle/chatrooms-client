import React from 'react';
import CreateRoomForm from '../components/CreateRoomForm';
import RoomsList from '../components/RoomsList';
import { Room } from '../types';

interface RoomsListPageProps {
  socket: any;
  rooms: Room[];
}

const RoomsListPage: React.FC<RoomsListPageProps> = ({ socket, rooms }) => {
  return (
    <div className='rooms-page'>
      <CreateRoomForm socket={socket} />
      <RoomsList rooms={rooms} />
    </div>
  );
};

export default RoomsListPage;
