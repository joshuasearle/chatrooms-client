import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';
import stringShortener from '../util/stringShortener';

interface RoomsListProps {
  rooms: Room[];
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms }) => {
  return (
    <div className='rooms-list half-page'>
      <h1 className='rooms-list__title'>Rooms</h1>
      <div className='rooms-list__list'>
        {rooms.map((room, i) => (
          <Link
            key={i}
            className='rooms-list__button button'
            to={`/rooms/${room.roomName}`}
          >
            {stringShortener(room.roomName, 10)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
