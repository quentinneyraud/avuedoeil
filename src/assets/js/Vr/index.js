import debug from 'debug'
import Video from './Video'
import Canvas from './Canvas'
import Three from './Three'
// import VrLayer from './VrLayer'
// import ExperienceManager from '../Experiences/ExperienceManager'
import Raf from 'raf'

const dbg = debug('avuedoeil:vr')

export default class Vr {

  constructor () {
    dbg('Init vr')

    Raf.polyfill()

    // Create Elements
    this.three = new Three()
    this.video = new Video()
    this.canvas = new Canvas()
    // this.vrLayer = new VrLayer()
    // this.experienceManager = new ExperienceManager(this.vrLayer)

    this.listenVideoFeed()
  }

  listenVideoFeed () {
    dbg('Listen video feed')

    if (!this.video.isBrowserSupport()) {
      return false
    }

    // this.video.getSourceId()
    this.video.getStream()
      .then(() => {
        this.canvas.createCanvas(this.video.getVideoDimensions())
        this.three.createCameraMesh(this.canvas)
        this.animate()
      })
      .catch((err) => {
        dbg('getStream error', err)
      })
  }

  animate () {
    if (this.canvas.context) {
      this.canvas.draw(this.video.$els.video)
      // this.vrLayer.stage.update()
      // this.canvas.context.drawImage(this.vrLayer.canvas, 0, 0, canvas.width, canvas.height)

      if (this.video.$els.video === this.video.$els.video.HAVE_ENOUGH_DATA) {
        this.three.texture.needsUpdate = true
      }

      Raf(this.animate.bind(this))

      this.three.update()
    }
  }
}
