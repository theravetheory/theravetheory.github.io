import React, {Component} from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";
import $ from 'jquery';

class ThreeCube extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 40, 1);
    var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(90, 90);
    // document.body.appendChild( renderer.domElement );
    this.mount.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry( 10, 9, 10 );
    var material = new THREE.MeshBasicMaterial();
    var cube = new THREE.Mesh( geometry, material );
    var tex = new THREE.TextureLoader().load(
      this.props.imagetexture,
      texture => {
        //Update Texture
        cube.material.map = texture;
        cube.material.needsUpdate = true;
        cube.scale.set(1.0, texture.image.height / texture.image.width, 1.0);
      },
      xhr => {
        //Download Progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        //Error CallBack
        console.log("An error happened" + error);
      }
    );
    scene.add( cube );
    camera.position.z = 20;
    camera.position.y = 2;
    var animate = function () {
      requestAnimationFrame( animate );
      // cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <div className="three-cube" ref={(mount) => {this.mount = mount;}}></div>
    )
  }
}

export default ThreeCube;
