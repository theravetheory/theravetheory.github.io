import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import miami_obj from '../objects/Miami 2525_2.obj';
import miami_mtl from '../objects/Miami_2525.mtl';

var ship_material = new THREE.MeshBasicMaterial( { color: 0x444444 } );

// import $ from 'jquery';

const style = {
    height: '100vh' // we can control scene size by setting container dimensions
};

class Miami extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addLights();
    this.loadTheModel();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
    this.radius = 500;
    this.angle = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  sceneSetup = () => {
      // get container dimensions and use them for scene sizing
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
          75, // fov = field of view
          width / height, // aspect ratio
          0.1, // near plane
          10000 // far plane
      );

      // this.camera.position.y = 200;
      this.camera.up.set(0,-1,0);

      this.camera.position.z = -1200;
      this.camera.position.x = -700;
      this.camera.position.y = -500;
      // OrbitControls allow a camera to orbit around the object
      // https://threejs.org/docs/#examples/controls/OrbitControls
      this.controls = new OrbitControls( this.camera, this.mount );

      // this.controls.target.set(3000, -800, 2000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( width, height );
      this.mount.appendChild( this.renderer.domElement ); // mount using React ref
  };

  loadTheModel = () => {
      // instantiate a loader
      const loader = new OBJLoader();

      var $this = this;

      // load a
      const materialsLoader = new MTLLoader();
      // materialsLoader.setMaterialOptions({
      //   'side': THREE.DoubleSide,
      //   'wrap': THREE.ClampToEdgeWrapping } );
      materialsLoader.load(miami_mtl, function(mtlCreator) {
        mtlCreator.preload();

        loader.setMaterials(mtlCreator);

        loader.load(
            // resource URL relative to the /public/index.html of the app
            miami_obj,
            // called when resource is loaded
            ( object ) => {
                // object.traverse( function( node ) {
                //   if ( node.material ) {
                //     node.material.side = THREE.DoubleSide;
                //   }
                // });
                object.scale.y = -1;
                // object.rotation.x = THREE.MathUtils.degToRad(180);


                $this.scene.add( object );
                // const axesHelper = new THREE.AxesHelper( 100 );
                // $this.scene.add( axesHelper );

                // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
                // you can always set console.log(this.scene) and check its children to know the name of a model
                const el = $this.scene.getObjectByName("city_buildings");
                el.material.color.setHex(0x000);
                console.log($this.scene)

                // change some custom props of the element: placement, color, rotation, anything that should be
                // done once the model was loaded and ready for display
                // el.position.set(200, -150,0 );
                // el.material.color.set('purple');
                // el.material.side = THREE.FrontSide;
                // el.rotation.y = 360;
                object.position.set(0, 80, 0);
                // object.translateX(-200);

                // make this element available inside of the whole component to do any animation later
                $this.model = object;
            },
            // called when loading is in progresses
             ( xhr ) => {

                const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
                console.log( ( loadingPercentage ) + '% loaded' );

                // update parent react component to display loading percentage
                // this.props.onProgress(loadingPercentage);
            },
            // called when loading has errors
             ( error ) => {

                console.log( 'An error happened:' + error );

            }
        );
      })

  };

  // adding some lights to the scene
  addLights = () => {
      const lights = [];

      // set color and intensity of lights
      lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

      // place some lights around the scene for best looks and feel
      lights[ 0 ].position.set( 0, 2000, 0 );
      lights[ 1 ].position.set( 1000, 2000, 1000 );
      lights[ 2 ].position.set( - 1000, - 2000, - 1000 );

      this.scene.add( lights[ 0 ] );
      this.scene.add( lights[ 1 ] );
      this.scene.add( lights[ 2 ] );
  };


  startAnimationLoop = () => {
      // slowly rotate an object
      if (this.model) {
        this.model.rotation.y += 0.002;
      }
      if (this.camera) {
        // this.camera.rotation.x = this.angle;
        // this.angle += 0.01;
      }

      this.renderer.render( this.scene, this.camera );

      // The window.requestAnimationFrame() method tells the browser that you wish to perform
      // an animation and requests that the browser call a specified function
      // to update an animation before the next repaint
      this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.renderer.setSize( width, height );
      this.camera.aspect = width / height;

      // Note that after making changes to most of camera properties you have to call
      // .updateProjectionMatrix for the changes to take effect.
      this.camera.updateProjectionMatrix();
  };

  render() {
      return <div className="miami-scene" style={style} ref={ref => (this.mount = ref)} />;
  }

}

export default Miami;
