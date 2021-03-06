import debug from 'debug'
import EaselJS from 'createjs-collection'

const dbg = debug('avuedoeil:vrLayer')
const SENSIBILITY = 3
// Pointer
const POINTER_RADIUS = 7
// Buttons
// const BUTTON_WIDTH = 150
// const BUTTON_HEIGHT = 70
// const BUTTON_MARGE_X = 50
// const BUTTON_MARGE_Y = 80
// const BUTTON_STROKE = 3

export default class VrLayer {
  constructor (width, height) {
    dbg('Init Vrlayer')

    this.alpha = null
    this.gamma = null
    this.canvas = null
    this.xCenter = null
    this.yCenter = null
    this.buttonInterval = null
    this.visionEffect = null
    this.buttonLeftHover = false
    this.buttonRightHover = false
    this.scalePointer = [1, 0.9, 0.8, 0.7, 0.8, 0.9, 1, 1.2, 1.3, 1.2, 1.1, 1]
    this.scalePointerIndex = 0
    this.elements = {}

    this.createCanvas(width, height)
    this.stage = new EaselJS.Stage(this.canvas)

    this.createVisionEffect()
    this.addPointer()

    EaselJS.Ticker.on('tick', (event) => {
      if (this.elements.buttonLeft && this.elements.buttonRight) {
        this.animateButtons()
        this.animateQuestion()
        this.detectButtons()
      }
      this.stage.update(event)
    })
  }

  createCanvas (width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height

    this.xCenter = width / 2
    this.yCenter = height / 2

    this.buttonLeft = {
      originalX: this.xCenter - 160,
      originalY: this.yCenter + 50
    }
    this.buttonRight = {
      originalX: this.xCenter + 30,
      originalY: this.yCenter + 50
    }
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
    dbg('add listener')
    window.addEventListener('deviceorientation', (event) => {
      if (!this.alpha && !this.gamma) {
        this.alpha = event.alpha
        this.gamma = event.gamma
      }
      if (this.elements.buttonLeft && this.elements.buttonRight && this.elements.question) {
        this.elements.buttonLeft.x = this.buttonLeft.originalX + (this.alpha - event.alpha) * -SENSIBILITY * 1.2
        this.elements.buttonLeft.y = this.buttonLeft.originalY + (this.gamma - event.gamma) * SENSIBILITY * 1.2
        this.elements.buttonRight.x = this.buttonRight.originalX + (this.alpha - event.alpha) * -SENSIBILITY
        this.elements.buttonRight.y = this.buttonRight.originalY + (this.gamma - event.gamma) * SENSIBILITY
        this.elements.question.x = this.question.originalX + (this.alpha - event.alpha) * -SENSIBILITY * 1.1
        this.elements.question.y = this.question.originalY + (this.gamma - event.gamma) * SENSIBILITY * 1.1
      }
    })
  }

  createButtons () {
    dbg('createButtons')

    // First
    let data = {
      images: ['static/img/vrComponent/bouton_oui.png'],
      frames: {width: 128, height: 70},
      framerate: 10
    }
    let sprite = new EaselJS.SpriteSheet(data)
    this.elements.buttonLeft = new EaselJS.Sprite(sprite)
    this.elements.buttonLeft.x = this.buttonLeft.originalX
    this.elements.buttonLeft.y = this.buttonLeft.originalY

    let data2 = {
      images: ['static/img/vrComponent/bouton_non.png'],
      frames: {width: 124, height: 70},
      framerate: 10
    }
    let sprite2 = new EaselJS.SpriteSheet(data2)
    this.elements.buttonRight = new EaselJS.Sprite(sprite2)
    this.elements.buttonRight.x = this.buttonRight.originalX
    this.elements.buttonRight.y = this.buttonRight.originalY

    this.stage.addChild(this.elements.buttonLeft)
    this.stage.addChild(this.elements.buttonRight)

    this.elements.buttonLeft.gotoAndStop(0)
    this.elements.buttonRight.gotoAndStop(0)

    this.stage.update()

    this.addButtonsListener()
  }

  animateButtons () {
    if (this.elements.buttonLeft && this.elements.buttonRight && this.elements.buttonLeft.alpha < 1 && this.elements.buttonRight.alpha < 1) {
      this.elements.buttonLeft.alpha += 0.10
      this.elements.buttonRight.alpha += 0.10
    }
  }

  animateQuestion () {
    if (this.elements.question && this.elements.question > 0) {
      this.elements.question -= 0.1
    }
  }

  detectButtons () {
    if (this.elements.buttonLeft.x < 310 && this.elements.buttonLeft.x > 180 && this.elements.buttonLeft.y < 240 && this.elements.buttonLeft.y > 170) {
      this.elements.buttonLeft.gotoAndStop(1)
      this.animatePointer()
      this.buttonLeftHover = true
      this.buttonInterval = setInterval(() => {
        this.onButtonValidated()
      }, 3000)
    } else if (this.buttonLeftHover) {
      this.elements.buttonLeft.gotoAndStop(0)
      this.addPointer()
      this.buttonLeftHover = false
      clearInterval(this.buttonInterval)
    }
    if (this.elements.buttonRight.x < 310 && this.elements.buttonRight.x > 180 && this.elements.buttonRight.y < 240 && this.elements.buttonRight.y > 170) {
      this.elements.buttonRight.gotoAndStop(1)
      this.animatePointer()
      this.buttonRightHover = true
    } else if (this.buttonRightHover) {
      this.elements.buttonRight.gotoAndStop(0)
      this.addPointer()
      this.buttonRightHover = false
    }
  }

  onButtonValidated () {
    this.stage.removeChild(this.elements.buttonLeft)
    this.stage.removeChild(this.elements.buttonRight)
    this.stage.removeChild(this.elements.question)
    document.getElementById('overlay').className = ''
  }

  animatePointer () {
    this.stage.removeChild(this.elements.pointer)
    this.scalePointerIndex ++

    this.elements.pointer = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    this.elements.pointer.graphics
      .setStrokeStyle(2)
      .beginStroke('#fff')
      .drawCircle(xCenter, yCenter, POINTER_RADIUS * this.scalePointer[this.scalePointerIndex % this.scalePointer.length])

    this.stage.addChild(this.elements.pointer)
  }

  createVisionEffect () {
    this.visionEffect = new EaselJS.Shape()
    let {xCenter, yCenter} = this

    this.visionEffect.graphics
      .setStrokeStyle(400)
      .beginRadialGradientStroke(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)'], [0, 0.3], xCenter, yCenter, 70, xCenter, yCenter, 340)
      .drawCircle(xCenter, yCenter, 100)

    this.stage.addChild(this.visionEffect)
  }

  showQuestion (src) {
    this.question = {
      originalX: this.xCenter - 350,
      originalY: this.yCenter - 200
    }
    this.elements.question = new EaselJS.Bitmap(src)
    this.elements.question.x = this.question.originalX
    this.elements.question.y = this.question.originalY
    this.elements.question.scaleX = 0.4
    this.elements.question.scaleY = 0.4

    this.stage.addChild(this.elements.question)
  }

  showTutorial (src, time, cb) {
    dbg('show tutorial')
    let bitMap = new EaselJS.Bitmap(src)
    bitMap.x = this.xCenter - 100
    bitMap.y = this.yCenter - 120
    bitMap.scaleX = 0.4
    bitMap.scaleY = 0.4

    this.stage.addChild(bitMap)
    setTimeout(() => {
      this.stage.removeChild(bitMap)
      cb()
    }, time)
  }
}
