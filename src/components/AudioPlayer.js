import React, { useEffect, useState } from "react";
import $ from "jquery";
import PlayPause from "./PlayPause.js";

const AudioEmbed = ({ serverState }) => {
  const { name, description, genre } = serverState;
  const isPlaying = false;
  return (
    <>
      <audio controls id="stream-player">
        <source
          src="http://54.163.26.105:8000/stream"
          type="audio/mpeg"
        ></source>
      </audio>
      <div className="scroll-left">
        <p>
          Now playing: {name} - {description} [{genre}]
        </p>
      </div>
      <div className="player-controls">
        <PlayPause isplaying={isPlaying} />
      </div>
    </>
  );
};

const AudioPlayer = ({ streamURL }) => {
  const [serverState, setServerState] = useState({
    serverName: null,
    serverDescription: null,
    serverGenre: null,
    status: null,
  });

  useEffect(() => {
    debugger;
    fetch(streamURL + "/stream")
      .then((response) => {
        debugger;
        setServerState({
          ...serverState,
          status: response.status,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("stream is down, son.");
      });
    $.getJSON({
      url: streamURL + "/status-json.xsl",
      success: (data, status, xhr) => {
        console.log(xhr);
        if (data.icestats.source) {
          setServerState({
            ...serverState,
            serverName: data.icestats.source.server_name,
            serverDescription: data.icestats.source.server_description,
            serverGenre: data.icestats.source.genre,
          });
        }
      },
      error: function (data) {
        console.log("there was an error");
      },
    });
  }, []);

  return serverState.status === 200 ? (
    <AudioEmbed serverState={serverState} />
  ) : serverState.status === 404 ? (
    <div className="scroll-left">
      <p>
        Donate to <a href="mailto:theravetheory0@gmail.com">theravetheory</a>
      </p>
    </div>
  ) : (
    <div className="scroll-left">
      <p> Loading... </p>
    </div>
  );
};

export default AudioPlayer;
