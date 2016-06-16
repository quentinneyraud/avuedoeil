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

  createCanvas (videoDimensions) {
    dbg('create canvas')

    let { width, height } = videoDimensions
    this.canvas = document.createElement('canvas')

    this.canvas.width = width
    this.canvas.height = height
    this.width = this.canvas.width
    this.height = this.canvas.height

    this.context = this.canvas.getContext('2d')
    document.getElementById('webglviewer').appendChild(this.canvas)
  }

  draw (video) {
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.width)
  }

}
