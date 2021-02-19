import logo from './trt_logo.png';
import './App.css';
// import AudioAnalyser from "react-audio-analyser"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Rave Theory radio coming soon.
        </p>
        <audio controls id="stream-player">
          <source src="https://theravetheory.evan-savage.com:8000/stream" type="audio/mpeg"></source>
        </audio>

      </header>
    </div>
  );
}

export default App;
