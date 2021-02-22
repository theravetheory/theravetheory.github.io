import React from "react";
import playbutton from './play.svg';

export default function Play(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <img src={playbutton} alt="play button"/>
    </button>
  );
}
