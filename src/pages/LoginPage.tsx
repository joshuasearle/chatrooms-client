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
    if (invalidName) return;
    if (!connected) return setErrorMessage('Server error');
    try {
      const data = await registerDisplayName(
        socket,
        displayNameInput,
        setRooms
      );
      console.log(data);

      console.log(data.created);
      if (!data.created) return setErrorMessage(data.message);

      setDisplayName(displayNameInput);
      setRedirectNext(true);
    } catch (e) {
      console.log(e);

      setErrorMessage('Server error');
    }
  };

  if (redirectNext) return <Redirect to='/rooms' push />;

  return (
    <div className='login'>
      <h1 className='login__title'>Set Your Display Name</h1>
      <form className='login__form'>
        <input
          type='text'
          className='login__input input'
          value={displayNameInput}
          onChange={(e: any) => setDisplayNameInput(e.target.value)}
          placeholder='Enter your display name here'
        />
        {errorMessage && (
          <div className='login__error error'>{errorMessage}</div>
        )}
        <button
          disabled={invalidName}
          className='button'
          onClick={buttonClickHandler}
        >
          View Rooms
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
