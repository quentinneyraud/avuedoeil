import debug from 'debug'

const dbg = debug('avuedoeil:canvas')

export default class Canvas {

  constructor () {
    dbg('Init canvas')
    this.context = null
    this.canvas = null
    this.width = null
    this.height = null
  }

  createCanvas () {
    dbg('create canvas')

    this.canvas = document.createElement('canvas')

    this.canvas.width = 640
    this.canvas.height = 480
    this.width = this.canvas.width
    this.height = this.canvas.height

    this.context = this.canvas.getContext('2d')
  }

  draw (video) {
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height)
  }

}
