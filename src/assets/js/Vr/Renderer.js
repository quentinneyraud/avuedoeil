export default class Renderer {
  constructor () {
    this.canvas = {
      left: {},
      right: {}
    }
  }

  createCanvas () {
    this.canvas.left.element = document.createElement('canvas')
    this.canvas.left.element.width = window.innerWidth / 2
    this.canvas.left.element.height = window.innerHeight
    document.getElementById('webglviewer').appendChild(this.canvas.left.element)

    this.canvas.right.element = document.createElement('canvas')
    this.canvas.right.element.width = window.innerWidth / 2
    this.canvas.right.element.height = window.innerHeight
    document.getElementById('webglviewer').appendChild(this.canvas.right.element)

    this.canvas.left.context = this.canvas.left.element.getContext('2d')
    this.canvas.right.context = this.canvas.right.element.getContext('2d')
  }

  render (canvas) {
    this.canvas.left.context.drawImage(canvas, 0, 0, canvas.width / 2, canvas.height)
    this.canvas.right.context.drawImage(canvas, 0, 0, canvas.width / 2, canvas.height)
  }
}
