import debug from 'debug'
import EaselJS from 'createjs-collection'

const dbg = debug('avuedoeil:vrLayer')

export default class VrLayer {
  constructor () {
    dbg('Init Vrlayer')

    this.canvas = null
    this.xCenter = null
    this.yCenter = null

    this.createCanvas()
    this.stage = new EaselJS.Stage(this.canvas)

    this.createVisionEffect()
  }

  createButtons () {
    dbg('create Buttons')
    let buttons = new EaselJS.Shape()
    let { xCenter, yCenter } = this

    buttons.graphics
      .setStrokeStyle(3)
      .beginStroke('#fff')
      .drawRect(xCenter * 0.7, yCenter + 100, 150, 70)
      .drawRect(xCenter * 1.2, yCenter + 100, 150, 70)

    this.stage.addChild(buttons)
  }

  createVisionEffect () {
    let circle = new EaselJS.Shape()

    circle.graphics
      .setStrokeStyle(600)
      .beginRadialGradientStroke(['rgba(0, 0, 0, 0)', 'black'], [0, 0.5], xCenter, yCenter, 150, xCenter, yCenter, 600)
      .drawCircle(xCenter, yCenter, 150)

    this.stage.addChild(circle)
  }

  createCanvas() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = video.clientWidth
    this.canvas.height = video.clientHeight

    this.xCenter = 250
    this.yCenter = 250
  }

  createStage () {

  }
}
