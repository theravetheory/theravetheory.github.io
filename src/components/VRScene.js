import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-mountain-component';
import 'aframe-gridhelper-component'
import 'aframe-fence-component'
import {Entity, Scene, Animation} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import vc from '../logos/VC.gltf'
import logo from '../logos/trt_logo.png'

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * Math.floor(max - min));
}

export default class VRScene extends React.Component {
  render () {
    const getRandomLogos = amount => {
      let content = [];
      const x_range = [-400, 400];
      const y_range = [10, 100];
      const z_range = [-400, 400];
      for (let i = 0; i < amount; i++) {
        content.push(
          <Entity
            geometry={{primitive: 'box'}}
            material={{roughness: 0.5, src: logo, color: '#ffff'}}
            scale={{x: 7, y: 5, z: 7}}
            position={{x: getRandomInt(x_range[0], x_range[1]),
              y: getRandomInt(y_range[0], y_range[1]),
              z: getRandomInt(z_range[0], z_range[1])}}
            animation={{property: "rotation", dur: 5000, loop: "true", to: {x:0, y:360, z:0}, easing: "linear" }} />
        )
      }
      return content
    }

    return (
      <Scene background={{color:'black'}} gridhelper={{size:1000, divisions:1000, colorGrid: 'green'}}>
        <Entity mountain material={{color: 'blue'}}/>
        {getRandomLogos(40)}
        <Entity primitive="a-camera" position={{x: 0, y:5, z:0}}>
          <Entity  />
        </Entity>
      </Scene>
    );
  }
}

// ReactDOM.render(<VRScene/>, document.querySelector('#sceneContainer'));
