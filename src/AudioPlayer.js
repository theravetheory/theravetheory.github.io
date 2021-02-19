import React from 'react';
// import $ from 'jquery';
// import AudioAnalyser from "react-audio-analyser"

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      error: null
    };
  }
  componentDidMount() {
    fetch("https://theravetheory.evan-savage.com:8000/stream")
      .then((response) => {
        this.setState({
          status: response.status,
        });
      })

    }
    render() {
      const { status } = this.state;
      console.log(status);
      if (status === 200) {
        return audioEmbed();
      } else if (status === 404) {
        return <p> The stream is not available currently. </p>;
      } else {
        return (
          <p> Loading... </p>
        );
      }
    }

}

// function checkHttpStatus(url) {
//     // $.ajax({
//     //     type: "GET",
//     //     data: {},
//     //     url: url,
//     //     error: function(response) {
//     //         console.log('yes');
//     //         return 0
//     //     },
//     //     success: function(response) {
//     //       return 1
//     //     }
//     // });
//     var myRequest = new Request(url)
//     fetch(myRequest).then(function(response) {
//         console.log(response.status);
//         if (response.status === 200) {
//           return
//         } else {
//           return <p> No stream available at this time. </p>
//         }
//
//     })
// }

function audioEmbed(props) {
  return (
    <audio controls id="stream-player">
      <source src="https://theravetheory.evan-savage.com:8000/stream" type="audio/mpeg"></source>
    </audio>
  )
}

export default AudioPlayer;
