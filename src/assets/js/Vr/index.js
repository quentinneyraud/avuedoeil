import debug from 'debug'
import Video from './Video'
import Canvas from './Canvas'
import Renderer from './Renderer'
import VrLayer from './VrLayer'
import ExperienceManager from '../Experiences/ExperienceManager'
import Raf from 'raf'
import socket from 'socket.io-client'

const dbg = debug('avuedoeil:vr')

export default class Vr {

  constructor () {
    dbg('Init vr')

    Raf.polyfill()

    // Create Elements
    this.video = new Video()
    this.canvas = new Canvas()
    this.renderer = new Renderer()

    this.io = socket.connect('192.168.1.61:3000')

    this.listenVideoFeed()
  }

  listenVideoFeed () {
    dbg('Listen video feed')

    if (!this.video.isBrowserSupport()) {
      return false
    }

    this.video.getSourceId()
      .then(() => {
        this.video.getStream()
          .then(() => {
            this.canvas.createCanvas(this.video.getVideoDimensions())
            this.renderer.createCanvas()
            this.vrLayer = new VrLayer(this.canvas.width, this.canvas.height)
            this.experienceManager = new ExperienceManager(this.vrLayer)
            this.io.on('test', () => {
              console.log('test')
            })
            this.animate()
          })
          .catch((err) => {
            dbg('getStream error', err)
          })
      })
      .catch(() => {
        dbg('Error while getting media devices')
      })
  }

  animate () {
    if (this.canvas.context) {
      // draw video in canvas
      this.canvas.draw(this.video.$els.video)
      // update overlay canvas
      this.vrLayer.stage.update()
      // and draw it in canvas
      this.canvas.context.drawImage(this.vrLayer.canvas, 0, 0, this.canvas.width, this.canvas.height)

      Raf(this.animate.bind(this))

      // draw eyes
      this.renderer.render(this.canvas.canvas)
    }
  }
}
