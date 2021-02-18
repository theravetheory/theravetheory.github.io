import logo from './logo.svg';
import './App.css';
import AudioAnalyser from "react-audio-analyser"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Soon to be React Web radio.
        </p>
        <audio controls>
          <source src="http://100.14.199.85:8001/stream"></source>
        </audio>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
