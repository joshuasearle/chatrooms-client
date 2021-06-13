import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Room } from '../types';

interface RoomPageProps {
  rooms: Room[];
  socket: any;
}

const RoomPage: React.FC<RoomPageProps> = ({ rooms, socket }) => {
  const [input, setInput] = useState('');
  const { roomName } = useParams<any>();
  const room = rooms.find((room) => room.roomName === roomName);

  const handleClick = (e: any) => {
    e.preventDefault();
    socket.emit('message', { roomName, content: input, socketId: socket.id });
  };

  if (!room) return <Redirect to='/room' />;

  return (
    <div className='room'>
      <div className='room__messages'></div>
      {room.messages.map((message) => (
        <>
          <div className='room_author'>{message.displayName}</div>
          <div className='room_message'>{message.content}</div>
        </>
      ))}
      <div className='room__send'>
        <input
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          type='text'
          className='room__input'
        />
        <button className='room__button' onClick={handleClick}>
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
