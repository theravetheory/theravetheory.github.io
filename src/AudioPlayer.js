import React from 'react';
import $ from 'jquery';

// import $ from 'jquery';
// import AudioAnalyser from "react-audio-analyser"

class AudioPlayer extends React.Component {
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
    $.getJSON(this.props.streamurl + "/status-json.xsl", (data) => {
      if (data !== null) {
        console.log(data.icestats.source.server_name);
        this.setState({
          serverName: data.icestats.source.server_name,
          serverDescription: data.icestats.source.server_description,
          serverGenre: data.icestats.source.genre,
        });
        console.log('status', this.state);
      }
    });
  }
  render() {
    const name = this.state.serverName;
    const status = this.state.status;
    const description = this.state.serverDescription;
    const genre = this.state.serverGenre;
    console.log(this.state);
    if (status === 200) {
      return (
        <AudioEmbed name={name} genre={genre} description={description}/>
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

class AudioEmbed extends React.Component {
  render () {
    return (
      <>
      <audio controls id="stream-player">
        <source src="https://theravetheory.evan-savage.com:8000/stream" type="audio/mpeg"></source>
      </audio>
      <p>{this.props.name}, {this.props.description}, {this.props.genre}</p>
      </>
    );
  }
}

export default AudioPlayer;
