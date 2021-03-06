import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Room } from '../types';
import stringShortener from '../util/stringShortener';

interface RoomPageProps {
  rooms: Room[];
  socket: any;
  displayName: string;
}

const RoomPage: React.FC<RoomPageProps> = ({ rooms, socket, displayName }) => {
  const [input, setInput] = useState('');
  const { roomName } = useParams<any>();
  const room = rooms.find((room) => room.roomName === roomName);

  const invalidInput = input === '';

  const handleClick = (e: any) => {
    e.preventDefault();
    socket.emit('message', { roomName, content: input, socketId: socket.id });
    setInput('');
  };

  if (!room) return <Redirect to={displayName ? '/rooms' : '/login'} />;

  return (
    <div className='room'>
      <h1 className='room__title'>{roomName}</h1>
      <div className='room__messages'>
        {room.messages.map((message, i) => {
          const authorClass =
            message.displayName === displayName
              ? 'room__author room__author--right'
              : 'room__author room__author--left';
          const messageClass =
            message.displayName === displayName
              ? 'room__message room__message--right'
              : 'room__message room__message--left';
          return [
            <div key={`message${i}`} className={authorClass}>
              {stringShortener(message.displayName, 15)}
            </div>,
            <div key={`author${i}`} className={messageClass}>
              {message.content}
            </div>,
          ];
        })}
      </div>

      <div className='room__send'>
        <textarea
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          className='room__input input'
        />
        <button
          disabled={invalidInput}
          className='room__button button'
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
