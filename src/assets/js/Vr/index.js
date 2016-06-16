import debug from 'debug'
import Video from './Video'
import Canvas from './Canvas'
import Renderer from './Renderer'
import VrLayer from './VrLayer'
import ExperienceManager from '../Experiences/ExperienceManager'
import Raf from 'raf'

const dbg = debug('avuedoeil:vr')

export default class Vr {

  constructor () {
    dbg('Init vr')

    Raf.polyfill()

    // Create Elements
    this.video = new Video()
    this.canvas = new Canvas()
    this.renderer = new Renderer()

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
        this.renderer.createCanvas()
        this.vrLayer = new VrLayer(this.canvas.width, this.canvas.height)
        this.experienceManager = new ExperienceManager(this.vrLayer)
        this.animate()
      })
      .catch((err) => {
        dbg('getStream error', err)
      })
  }

  animate () {
    if (this.canvas.context) {
      this.canvas.draw(this.video.$els.video)
      this.vrLayer.stage.update()
      this.canvas.context.drawImage(this.vrLayer.canvas, 0, 0, this.canvas.width, this.canvas.height)

      Raf(this.animate.bind(this))

      this.renderer.render(this.canvas.canvas)
    }
  }
}
