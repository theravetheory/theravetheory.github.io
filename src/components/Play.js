import React from "react";
import playbutton from './play.svg';

export default function Play({onPlayerClick}) {
  return (
    <button className="player__button" onClick={onPlayerClick}>
      <img src={playbutton} alt="play button"/>
    </button>
  );
}
