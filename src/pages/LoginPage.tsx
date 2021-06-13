import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import registerDisplayName from '../api/registerDisplayName';

interface LoginPageProps {
  displayNameInput: string;
  setDisplayNameInput: any;
  setDisplayName: any;
  connected: boolean;
  socket: any;
  setRooms: any;
}

const LoginPage: React.FC<LoginPageProps> = ({
  displayNameInput,
  setDisplayNameInput,
  setDisplayName,
  connected,
  socket,
  setRooms,
}) => {
  const [redirectNext, setRedirectNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const invalidName = displayNameInput === '';

  const buttonClickHandler = async (e: any) => {
    e.preventDefault();
    if (invalidName || !connected) return;
    const data = await registerDisplayName(socket, displayNameInput, setRooms);
    if (!data.created) return setErrorMessage(data.message);
    setDisplayName(displayNameInput);
    setRedirectNext(true);
  };

  if (redirectNext) return <Redirect to='/rooms' push />;

  return (
    <div className='login'>
      <h1 className='login__title'>Set Your Display Name</h1>
      <form className='login__form'>
        <input
          type='text'
          className='login__input'
          value={displayNameInput}
          onChange={(e: any) => setDisplayNameInput(e.target.value)}
        />
        {errorMessage ? errorMessage : null}
        <button
          disabled={invalidName}
          className='login__button'
          onClick={buttonClickHandler}
        >
          View Rooms
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
