import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-mountain-component';
import 'aframe-gridhelper-component'
import 'aframe-fence-component'
import 'aframe-extras'
import {Entity, Scene, Animation} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import vc from '../logos/VC.gltf'
import logo from '../logos/trt_logo.png'


function getRandomInt(min_max) {
  return Math.floor(min_max[0] + Math.random() * Math.floor(min_max[1] - min_max[0]));
}

export default class VRScene extends React.Component {
  render () {
    const getRandomLogos = amount => {
      let content = [];
      const x_range = [-200, 200];
      const y_range = [10, 100];
      const z_range = [-200, 200];
      const rot_range = [0, 360];
      for (let i = 0; i < amount; i++) {
        var r_axis = Math.floor(Math.random() * 3);
        console.log(r_axis);
        content.push(
          <Entity
            geometry={{primitive: 'box'}}
            material={{src: logo, opacity: 0.99, shader: 'flat'}}
            scale={{x: 7, y: 5, z: 7}}
            position={{x: getRandomInt(x_range),
              y: getRandomInt(y_range),
              z: getRandomInt(z_range)}}
            animation={{property: "rotation", dur: getRandomInt([2000, 10000]),
              loop: "true", dir: "alternate",
              to: {x:((r_axis === 0) ? getRandomInt(rot_range) : 0),
                   y:((r_axis === 1) ? getRandomInt(rot_range) : 0),
                   z:((r_axis === 2) ? getRandomInt(rot_range) : 0)}, easing: "linear" }} />
        )
      }
      return content
    }

    return (
      <Scene background={{color:'black'}} gridhelper={{size:1000, divisions:300, colorGrid: '#04ed00', colorCenterLine: '#feef49'}}>

        {getRandomLogos(30)}
        <Entity primitive="a-camera" wasd-controls-enabled="true" position={{x: 0, y:5, z:0}} fence={{width: 100, depth: 100}}>
        </Entity>
      </Scene>
    );
  }
}

// ReactDOM.render(<VRScene/>, document.querySelector('#sceneContainer'));
