import logo from './trt_logo.png';
import './Fonts.css';
import './App.scss';
import './Scroll.scss';
import * as THREE from 'three'
import AudioPlayer from './AudioPlayer.js';
import HomeBkgd from './VantaBkgd.js'


function App() {
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  return (
    <div className="app-wrapper">
      <HomeBkgd />
      <div className="nav-wrapper">
        <nav className="navbar">
          {// <div className="icon-container">
          // </div>
          }
          <div className="icon-container">
            <img className="App-logo" src={logo} alt="The rave theory logo" />
          </div>
          <AudioPlayer streamurl={stream_url}/>
        </nav>
      </div>
      <div>
        <header className="App-header">
        </header>
      </div>
    </div>
  );
}

export default App;
