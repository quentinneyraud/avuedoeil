import debug from 'debug'
import EaselJS from 'createjs-collection'

const dbg = debug('avuedoeil:vrLayer')

export default class VrLayer {
  constructor (width, height) {
    dbg('Init Vrlayer')

    this.canvas = null
    this.xCenter = null
    this.yCenter = null
    this.pointer = null

    this.createCanvas(width, height)
    this.stage = new EaselJS.Stage(this.canvas)

    this.createVisionEffect()
    this.addPointer()
  }

  addPointer () {
    dbg('addPointer')
    this.pointer = new EaselJS.Shape()
    let { xCenter, yCenter } = this

    this.pointer.graphics
      .setStrokeStyle(2)
      .beginStroke('#fff')
      .drawCircle(xCenter, yCenter, 15)

    this.stage.addChild(this.pointer)
  }

  createButtons () {
    dbg('createButtons')
    let buttons = new EaselJS.Shape()
    let { xCenter, yCenter } = this

    buttons.graphics
      .setStrokeStyle(3)
      .beginStroke('#fff')
      .drawRect(xCenter - 270, yCenter + 100, 150, 70)
      .drawRect(xCenter + 120, yCenter + 100, 150, 70)

    this.stage.addChild(buttons)
  }

  createVisionEffect () {
    let circle = new EaselJS.Shape()
    let { xCenter, yCenter } = this

    circle.graphics
      .setStrokeStyle(600)
      .beginRadialGradientStroke(['rgba(0, 0, 0, 0)', 'black'], [0, 0.5], xCenter, yCenter, 150, xCenter, yCenter, 600)
      .drawCircle(xCenter, yCenter, 150)

    this.stage.addChild(circle)
  }

  createCanvas (width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height

    this.xCenter = width / 2
    this.yCenter = height / 2
  }
}
