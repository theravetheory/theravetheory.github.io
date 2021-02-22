import React, {Component} from 'react'
import Play from './Play.js';
import Pause from './Pause.js';
import $ from 'jquery';

export default class PlayPause extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
  }

  handlePlayerClick = () => {
    if (!this.state.playing) {
      this.setState({playing: true});
      $('#stream-player')[0].play();
    } else {
      this.setState({playing: false});
      $('#stream-player')[0].pause();
    }
  }

  render() {
    return (
      <>
      {
        this.state.playing? <Pause onPlayerClick={this.handlePlayerClick} /> : <Play onPlayerClick={this.handlePlayerClick} />
      }
      </>
    )
  }
}
