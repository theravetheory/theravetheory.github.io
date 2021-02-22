import React from 'react';
import $ from 'jquery';

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
    })
  }
  render() {
    const status = this.state.status;
    console.log(this.state);
    if (status === 200) {
      return (
        <AudioEmbed name={this.state.serverName} genre={this.state.serverDescription} description={this.state.serverGenre}/>
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
