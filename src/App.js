import logo from './trt_logo.png';
import './Fonts.css';
import './App.scss';
import AudioPlayer from './AudioPlayer.js';


function App() {
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  return (
    <div className="app-wrapper">
      <div className="nav-wrapper">
        <nav className="navbar">
          <div className="icon-container">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </nav>
      </div>
      <div>
        <header className="App-header">
          <p>The Rave Theory radio coming soon.</p>
          <AudioPlayer streamurl={stream_url}/>
        </header>
      </div>
    </div>
  );
}

export default App;
