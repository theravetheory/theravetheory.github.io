import logo_small from './logos/trt_logo_small.png';
import logosquaresmall from './logos/trtsquaresmall.png';
import icon from './logos/trt_favicon.png';
import './Fonts.css';
import './scss/App.scss';
import './scss/Scroll.scss';
import AudioPlayer from './components/AudioPlayer.js';
import HomeBkgd from './components/VantaBkgd.js';
import ThreeCube from './components/THREECube.js';


function App() {
  const stream_url = "https://theravetheory.evan-savage.com:8000";
  return (
    <div className="app-wrapper">
      <HomeBkgd />

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
        </header>
      </div>

    </div>

  );
}

export default App;
