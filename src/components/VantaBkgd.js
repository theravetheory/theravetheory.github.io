import React from 'react'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

class HomeBkgd extends React.Component {
  constructor() {
    super()
    this.vantaRef = React.createRef();
  }
  componentDidMount() {
    this.vantaEffect = NET({
      el: this.vantaRef.current,
      THREE: THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: true,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x04ed00,
      points: 5.00,
      maxDistance: 17.00,
      spacing: 5.00,
      backgroundColor: 0x727478,
      showDots: true,
    })
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }
  render() {
    return <div className="vanta-background" ref={this.vantaRef}>
    </div>
  }
}

export default HomeBkgd;
