import React from "react";
import pausebutton from './pause.svg';

export default function Play({onPlayerClick}) {
  return (
    <button className="player__button" onClick={onPlayerClick}>
      <img src={pausebutton} alt="pause button" />
    </button>
  );
}
