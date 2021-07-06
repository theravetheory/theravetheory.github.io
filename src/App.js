import logo_small from './logos/trt_logo.png';
// import logosquaresmall from './logos/trtsquaresmall.png';
// import icon from './logos/trt_favicon.png';
import config from './config';
import './Fonts.css';
import './scss/App.scss';
import './scss/Scroll.scss';
import AudioPlayer from './components/AudioPlayer.js';
import HomeBkgd from './components/VantaBkgd.js';
import ThreeCube from './components/THREECube.js';
import VRScene from './components/VRScene.js';
import { Entity, Scene } from 'aframe-react';
import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import ChatRoom from "./components/ChatRoom.js";
import * as Realm from "realm-web";
import $ from 'jquery';
import { ConsoleWriter } from 'istanbul-lib-report';

const REALM_APP_ID = "theravetheoryradio-rducr"; // e.g. myapp-abcde
const app: Realm.App = new Realm.App({ id: REALM_APP_ID });

// Create a component that displays the given user's details
function UserDetail({ user, username, setUser}) {
  const logoutAnonymous = async () => {
    // await app.currentUser.logOut();
    setUser(false);
  }
  return (
    <div className="login-wrapper">
      <h1>Logged in with username <span>{username}</span></h1>
      <button onClick={logoutAnonymous}>Log Out</button>
    </div>
  );
}

// Create a component that lets an anonymous user log in
function Login({ setUser, setUserName }) {
  const loginAnonymous = async () => {
    console.log($('#login-name input').val());
    setUserName($('#login-name input').val());
    // const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(true);
  };
  return (
    <div className="login-wrapper">
      <label id="login-name"> Name: <input type="text"/></label>
      <button onClick={loginAnonymous}>Log In</button>
    </div>
  );
}

const SERVER = "http://159.203.115.224:5000";
function App() {
  // console.log(Realm);
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  const [user, setUser] = React.useState();
  const [username, setUserName] = React.useState();
  const [dataState, setDataState] = useState(null);
  //const socket = io(config[process.env.NODE_ENV].endpoint, { transports: ["websocket"] });
  //console.log('Socket.io connecting on ' + config[process.env.NODE_ENV].endpoint);
  //socket.on('connection', () => {
  //        console.log(`I'm connected with the back-end`);
  //});

  useEffect(() => {
	  const socket = socketIOClient(config[process.env.NODE_ENV].endpoint, {
      secure:true,
      reconnect: true,
      rejectUnauthorized : false
    });
	  console.log('Socket.io connecting on ' + config[process.env.NODE_ENV].endpoint);
	  socket.on('connection', () => {
          	console.log(`I'm connected with the back-end`);
  	  });
  }, []);
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

      <div>
        <header className="App-header">
          {user ? <UserDetail user={user} username={username} setUser={setUser}/> : <Login setUser={setUser} setUserName={setUserName}/>}
        </header>
      </div>

      <div className="nav-wrapper">
        <nav className="navbar">
          <div className="icon-container">
            <ThreeCube imagetexture={logo_small}/>
          </div>
          <AudioPlayer streamurl={stream_url}/>
        </nav>

      </div>
      { user && <ChatRoom roomId="1" user={user} username={username} /> }


    </div>

  );
}

export default App;
