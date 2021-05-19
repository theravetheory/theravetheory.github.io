import logo_small from './logos/trt_logo.png';
// import logosquaresmall from './logos/trtsquaresmall.png';
// import icon from './logos/trt_favicon.png';
// import React from 'react';
import './Fonts.css';
import './scss/App.scss';
import './scss/Scroll.scss';
import AudioPlayer from './components/AudioPlayer.js';
import HomeBkgd from './components/VantaBkgd.js';
import ThreeCube from './components/THREECube.js';
import VRScene from './components/VRScene.js';
import { Entity, Scene } from 'aframe-react';
import React, {useState, useEffect} from 'react';
import socketClient  from "socket.io-client";

import * as Realm from "realm-web";
import $ from 'jquery';

const REALM_APP_ID = "theravetheoryradio-rducr"; // e.g. myapp-abcde
const app: Realm.App = new Realm.App({ id: REALM_APP_ID });

// Create a component that displays the given user's details
function UserDetail({ user, username, setUser}) {
  const logoutAnonymous = async () => {
    await app.currentUser.logOut();
    setUser(false);
  }
  return (
    <div className="login-wrapper">
      <h1>Logged in with anonymous id: <span>{user.id}</span> and username <span>{username}</span></h1>
      <button onClick={logoutAnonymous}>Log Out</button>
    </div>
  );
}

// Create a component that lets an anonymous user log in
function Login({ setUser, setUserName }) {
  const loginAnonymous = async () => {
    console.log($('#login-name input').val());
    setUserName($('#login-name input').val());
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return (
    <div className="login-wrapper">
      <label id="login-name"> Name: <input type="text"/></label>
      <button onClick={loginAnonymous}>Log In</button>
    </div>
  );
}

const SERVER = "http://127.0.0.1:5000";
function App() {
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  const [user, setUser] = React.useState(app.currentUser);
  const [username, setUserName] = React.useState();
  const [dataState, setDataState] = useState(null);
  var socket = socketClient (SERVER);
  socket.on('connection', () => {
          console.log(`I'm connected with the back-end`);
  });

  {
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   callBackendAPI()
  //     .then(res => setDataState(res.express))
  //     .catch(err => console.log(err));
  // });
  //
  // const callBackendAPI = async() => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // }
  }

  return (
    <div className="app-wrapper">
      <VRScene />
      <h1>{dataState}</h1>
      <div className="nav-wrapper">
        <nav className="navbar">
          <div className="icon-container">
            <ThreeCube imagetexture={logo_small}/>
          </div>
          <AudioPlayer streamurl={stream_url}/>
        </nav>
      </div>
      <div>
        <header className="App-header">
          {user ? <UserDetail user={user} username={username} setUser={setUser}/> : <Login setUser={setUser} setUserName={setUserName}/>}
        </header>
      </div>

    </div>

  );
}

export default App;
