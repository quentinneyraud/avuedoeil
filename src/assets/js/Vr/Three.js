import debug from 'debug'
import THREE from 'three'
import '../lib/StereoEffect'

const dbg = debug('avuedoeil:Three')

export default class Three {

  constructor () {
    dbg('Init Three')

    this.texture = null
    this.scene = null
    this.camera = null
    this.renderer = null

    this.initializeElements()

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700)

    this.camera.position.set(0, 15, 0)

    this.scene.add(this.camera)
    this.renderer = new THREE.WebGLRenderer()

    this.addRenderer()
    this.setCardboardEffect()
  }

  initializeElements () {
    this.$els = {
      container: document.getElementById('webglviewer')
    }
  }

  addRenderer () {
    this.$els.container.appendChild(this.renderer.domElement)
  }

  setCardboardEffect () {
    this.effect = new THREE.StereoEffect(this.renderer)
  }

  createCameraMesh (Canvas) {
    dbg('createCameraMesh')

    let texture = new THREE.Texture(Canvas.canvas)
    texture.context = Canvas.context
    let cameraPlane = new THREE.PlaneBufferGeometry(1920, 1280)

    let cameraMesh = new THREE.Mesh(cameraPlane, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      map: texture
    }))
    cameraMesh.position.z = -600

    this.texture = texture
    this.scene.add(cameraMesh)
  }

  update () {
    let width = this.$els.container.offsetWidth
    let height = this.$els.container.offsetHeight

    this.camera.aspect = width / height
    this.renderer.setSize(width, height)

    this.effect.setSize(width, height)
    this.camera.updateProjectionMatrix()
    this.effect.render(this.scene, this.camera)
  }
}
