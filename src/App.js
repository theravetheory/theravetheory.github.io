import logo from './trt_logo.png';
import './Fonts.css';
import './App.scss';
import './Scroll.scss';
import AudioPlayer from './AudioPlayer.js';


function App() {
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  return (
    <div className="app-wrapper">
      <div className="nav-wrapper">
        <nav className="navbar">
          <div className="icon-container">
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
