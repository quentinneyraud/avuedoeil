import debug from 'debug'
import EaselJS from 'createjs-collection'

const dbg = debug('avuedoeil:vrLayer')
const SENSIBILITY = 6

export default class VrLayer {
  constructor (width, height) {
    dbg('Init Vrlayer')

    this.alpha = null
    this.gamma = null
    this.canvas = null
    this.xCenter = null
    this.yCenter = null
    this.pointer = null
    this.buttons = {}

    this.createCanvas(width, height)
    this.stage = new EaselJS.Stage(this.canvas)

    this.createVisionEffect()
    this.addPointer()

    EaselJS.Ticker.on('tick', (event) => {
      this.animateButtons()
      this.detectButtons()
      this.stage.update(event)
    })
  }

  addPointer () {
    dbg('addPointer')
    this.pointer = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    this.pointer.graphics
      .setStrokeStyle(2)
      .beginStroke('#fff')
      .drawCircle(xCenter, yCenter, 7)

    this.stage.addChild(this.pointer)
  }

  addButtonsListener () {
    window.addEventListener('deviceorientation', (event) => {
      if (!this.alpha && !this.gamma) {
        this.alpha = event.alpha
        this.gamma = event.gamma
      }
      if (this.buttons.element) {
        this.buttons.element.y = (this.gamma - event.gamma) * -SENSIBILITY
        this.buttons.element.x = (this.alpha - event.alpha) * -SENSIBILITY
        let pt = this.buttons.element.localToLocal(this.buttons.element.x, this.buttons.element.y, this.pointer)
        if (this.pointer.hitTest(pt.x, pt.y)) {
          window.alert('hit')
        }
      }
    })
  }

  createButtons () {
    dbg('createButtons')
    this.buttons.element = new EaselJS.Shape()
    this.buttons.element.alpha = 0
    let {xCenter, yCenter} = this

    this.buttons.element.graphics
      .setStrokeStyle(3)
      .beginStroke('#FFFFFF')
      .drawRect(xCenter - 200, yCenter + 80, 150, 70)
      .drawRect(xCenter + 50, yCenter + 80, 150, 70)

    this.stage.addChild(this.buttons.element)
    this.stage.setChildIndex(this.buttons.element, 20)
    this.addButtonsListener()
  }

  animateButtons () {
    if (this.buttons.element && this.buttons.element.alpha < 1) {
      this.buttons.element.alpha += 0.10
    }
  }

  detectButtons () {
    if (this.buttons === 0) {
      this.buttons.callback('test')
    }
  }

  setListenerButtons (cb) {
    this.buttons.callback = cb
  }

  createVisionEffect () {
    let circle = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    circle.graphics
      .setStrokeStyle(320)
      .beginRadialGradientStroke(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)'], [0, 0.3], xCenter, yCenter, 70, xCenter, yCenter, 340)
      .drawCircle(xCenter, yCenter, 60)

    this.stage.addChild(circle)
    this.stage.setChildIndex(circle, this.stage.getNumChildren() - 1)
  }

  createCanvas (width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height

    this.xCenter = width / 2
    this.yCenter = height / 2
  }

  showQuestion (spriteSrc, width, height, columns, lines) {
    let {xCenter, yCenter} = this
    let data = {
      images: [spriteSrc],
      frames: {width: width / columns, height: height / lines},
      framerate: 10
    }
    let sprite = new EaselJS.SpriteSheet(data)
    let animation = new EaselJS.Sprite(sprite)
    animation.x = xCenter - 350
    animation.y = yCenter - 200
    animation.scaleX = 0.8
    animation.scaleY = 0.8

    this.stage.addChild(animation)
    animation.gotoAndStop(15)
  }
}
