import debug from 'debug'

const dbg = debug('avuedoeil:canvas')

export default class Canvas {

  constructor () {
    dbg('Init canvas')
    this.context = null
    this.canvas = null
  }

  createCanvas (videoDimensions) {
    dbg('create canvas')

    let { width, height } = videoDimensions
    this.canvas = document.createElement('canvas')

    this.canvas.width = width
    this.canvas.height = height
    this.canvas.width = this.nextPowerOf2(this.canvas.width)
    this.canvas.height = this.nextPowerOf2(this.canvas.height)
    // document.getElementById('webglviewer').appendChild(this.canvas)

    this.context = this.canvas.getContext('2d')
  }

  nextPowerOf2 (x) {
    return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2)))
  }

  draw (video) {
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.width)
    let centerX = this.canvas.width / 2
    let centerY = this.canvas.height / 2
    let radius = 70

    this.context.beginPath()
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    this.context.fillStyle = 'green'
    this.context.fill()
    this.context.lineWidth = 5
    this.context.strokeStyle = '#003300'
    this.context.stroke()
  }

}
