import React, {Component} from 'react';
import $ from 'jquery';
// import ReactDOM from 'react-dom';
import PlayPause from './PlayPause.js';
import useAudioPlayer from './useAudioPlayer.js';
import equal from 'fast-deep-equal';


function AudioEmbed() {
  const { playing, setPlaying } = useAudioPlayer();
  const isplaying = false;
  return (
    <>
    <audio controls id="stream-player">
      <source src="https://theravetheory.evan-savage.com:8000/stream" type="audio/mpeg"></source>
    </audio>
    <div className="scroll-left">
      <p>This is a test</p>
    </div>
    <div className="player-controls">
      <PlayPause isplaying={isplaying}/>
    </div>
    </>
  );
}

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      error: null,
      serverName: null,
      serverDescription: null,
      serverGenre: null,
    };
  }
  componentDidMount() {
    fetch(this.props.streamurl + "/stream")
    .then((response) => {
      this.setState({
        status: response.status,
      });
      console.log('stream', this.state);
    });
    $.getJSON({
      url: this.props.streamurl + "/status-json.xsl",
      success: (data, status, xhr) => {
        console.log(xhr)
        if (data.icestats.source) {
          this.setState({
            serverName: data.icestats.source.server_name,
            serverDescription: data.icestats.source.server_description,
            serverGenre: data.icestats.source.genre,
          });
        }
      },
      error: function(data) {
        console.log('there was an error');
      }
    });
  }

  render() {
    const status = this.state.status;

    // console.log(element);
    if (status === 200) {
      return (
        <AudioEmbed/>
      )
    } else if (status === 404) {
      return <p> The stream is not available currently. </p>;
    } else {
      return (
        <p> Loading... </p>
      );
    }
  }

}
