import logo from './trt_logo.png';
import './Fonts.css';
import './App.css';
import AudioPlayer from './AudioPlayer.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Rave Theory radio coming soon.
        </p>
        <AudioPlayer />
      </header>
    </div>
  );
}

export default App;
