import React from 'react';
import JoinBlock from './components/joinBlock';
import socket from './socket'
import './index.css'
import reducer from "../src/reducer";
import Chat from './components/Chat';
import axios from 'axios'


function App() {

  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN',obj);

    const {data}= await axios.get(`/rooms/${obj.roomId}`)
    setUsers(data.users)
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }
 
  React.useEffect(()=>{
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  },[])

  return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
