import React from "react";
import pausebutton from './pause.svg';

export default function Play(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <img src={pausebutton} alt="pause button" />
    </button>
  );
}
