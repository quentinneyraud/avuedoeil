import debug from 'debug'
import EaselJS from 'createjs-collection'

const dbg = debug('avuedoeil:vrLayer')
const SENSIBILITY = 5
// Pointer
const POINTER_RADIUS = 7
// Buttons
const BUTTON_WIDTH = 150
const BUTTON_HEIGHT = 70
const BUTTON_MARGE_X = 50
const BUTTON_MARGE_Y = 80
const BUTTON_STROKE = 3

export default class VrLayer {
  constructor (width, height) {
    dbg('Init Vrlayer')

    this.alpha = null
    this.gamma = null
    this.canvas = null
    this.xCenter = null
    this.yCenter = null
    this.elements = {}

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

  createCanvas (width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height

    this.xCenter = width / 2
    this.yCenter = height / 2
  }

  addPointer () {
    dbg('addPointer')
    this.elements.pointer = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    this.elements.pointer.graphics
      .setStrokeStyle(2)
      .beginStroke('#fff')
      .drawCircle(xCenter, yCenter, POINTER_RADIUS)

    this.stage.addChild(this.elements.pointer)
  }

  addButtonsListener () {
    window.addEventListener('deviceorientation', (event) => {
      if (!this.alpha && !this.gamma) {
        this.alpha = event.alpha
        this.gamma = event.gamma
      }
      if (this.elements.buttonLeft && this.elements.buttonRight) {
        this.elements.buttonLeft.x = (this.alpha - event.alpha) * -SENSIBILITY
        this.elements.buttonLeft.y = (this.gamma - event.gamma) * SENSIBILITY
        this.elements.buttonRight.x = (this.alpha - event.alpha) * -SENSIBILITY
        this.elements.buttonRight.y = (this.gamma - event.gamma) * SENSIBILITY
      }
    })
  }

  createButtons () {
    dbg('createButtons')
    let {xCenter, yCenter} = this

    // First
    this.elements.buttonLeft = new EaselJS.Shape()
    this.elements.buttonLeft.alpha = 0

    this.elements.buttonLeft.graphics
      .setStrokeStyle(BUTTON_STROKE)
      .beginStroke('#FFFFFF')
      .drawRect(xCenter - BUTTON_MARGE_X - BUTTON_WIDTH, yCenter + BUTTON_MARGE_Y, BUTTON_WIDTH, BUTTON_HEIGHT)

    // Second
    this.elements.buttonRight = new EaselJS.Shape()
    this.elements.buttonRight.alpha = 1

    this.elements.buttonRight.graphics
      .setStrokeStyle(BUTTON_STROKE)
      .beginStroke('#FFFFFF')
      .drawRect(xCenter + BUTTON_MARGE_X, yCenter + BUTTON_MARGE_Y, BUTTON_WIDTH, BUTTON_HEIGHT)

    this.stage.addChild(this.elements.buttonRight)
    this.stage.update()

    this.stage.addChild(this.elements.buttonLeft)

    this.addButtonsListener()
  }

  animateButtons () {
    if (this.elements.buttonLeft && this.elements.buttonRight && this.elements.buttonLeft.alpha < 1 && this.elements.buttonRight.alpha < 1) {
      this.elements.buttonLeft.alpha += 0.10
      this.elements.buttonRight.alpha += 0.10
    }
  }

  detectButtons () {
    if (this.elements.buttonLeft && this.elements.buttonRight) {

    }
  }

  createVisionEffect () {
    let circle = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    circle.graphics
      .setStrokeStyle(400)
      .beginRadialGradientStroke(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)'], [0, 0.3], xCenter, yCenter, 70, xCenter, yCenter, 340)
      .drawCircle(xCenter, yCenter, 100)

    this.stage.addChild(circle)
    this.stage.setChildIndex(circle, this.stage.getNumChildren() - 1)
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
    animation.x = xCenter - 200
    animation.y = yCenter - 100
    animation.scaleX = 0.5
    animation.scaleY = 0.5

    this.stage.addChild(animation)
    animation.gotoAndPlay(1)
  }

  showTutorial (src, time, cb) {
    dbg('show tutorial')
    let bitMap = new EaselJS.Bitmap(src)
    bitMap.x = this.xCenter - 140
    bitMap.y = this.yCenter - 75
    bitMap.scaleX = 0.15
    bitMap.scaleY = 0.15

    this.stage.addChild(bitMap)
    setTimeout(() => {
      this.stage.removeChild(bitMap)
      cb()
    }, time)
  }
}
