import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import useDisplayName from './hooks/useDisplayName';
import useRooms from './hooks/useRooms';
import useSocket from './hooks/useSocket';
import LoginPage from './pages/LoginPage';
import RoomPage from './pages/RoomPage';
import RoomsListPage from './pages/RoomsListPage';

const App = () => {
  const [displayName, setDisplayName, displayNameInput, setDisplayNameInput] =
    useDisplayName();

  const [socket, connected] = useSocket();
  const [rooms, setRooms] = useRooms(socket, connected);

  return (
    <Router>
      <Navbar displayName={displayName} />
      <Switch>
        <Route exact path='/login'>
          <LoginPage
            setRooms={setRooms}
            socket={socket}
            connected={connected}
            displayNameInput={displayNameInput}
            setDisplayNameInput={setDisplayNameInput}
            setDisplayName={setDisplayName}
          />
        </Route>
        <Route exact path='/rooms'>
          {/* If not logged in, redirect to login page */}
          {!displayName ? <Redirect to='/login' /> : null}
          <RoomsListPage socket={socket} rooms={rooms} />
        </Route>
        <Route exact path='/rooms/:roomName'>
          {/* If not logged in, redirect to login page */}
          {!displayName ? <Redirect to='/login' /> : null}
          <RoomPage rooms={rooms} socket={socket} />
        </Route>
        <Route exact path=''>
          <Redirect to='/login' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
