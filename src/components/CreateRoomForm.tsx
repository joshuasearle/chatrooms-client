import React, { useState } from 'react';
import createRoom from '../api/createRoom';

interface CreateRoomFormProps {
  socket: any;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ socket }) => {
  const [roomName, setRoomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const invalidRoomName = roomName === '';

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const data = await createRoom(socket, roomName);

    if (!data.created) {
      setErrorMessage(data.message);
      setConfirmationMessage('');
    } else {
      setConfirmationMessage(data.message);
      setErrorMessage('');
      setRoomName('');
    }
  };

  return (
    <div className='create-room half-page'>
      <h1 className='create-room__title'>Create Room</h1>
      <form className='create-room__form'>
        <input
          value={roomName}
          type='text'
          className='create-room__input input'
          onChange={(e: any) => {
            setConfirmationMessage('');
            setErrorMessage('');
            setRoomName(e.target.value);
          }}
        />
        {errorMessage && <div className='error'>{errorMessage}</div>}
        {confirmationMessage && (
          <div className='success'>{confirmationMessage}</div>
        )}
        <button
          className='create-room__button button'
          onClick={handleCreateRoom}
          disabled={invalidRoomName}
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
