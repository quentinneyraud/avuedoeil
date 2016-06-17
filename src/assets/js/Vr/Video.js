import debug from 'debug'

const dbg = debug('avuedoeil:video')

export default class Video {

  constructor () {
    dbg('Init Video')

    this.videoOptions = {
      video: {
        optional: []
      },
      audio: false
    }

    this.initializeElements()
  }

  // create video tag
  initializeElements () {
    dbg('initializeElements')
    this.$els = {
      video: document.createElement('video')
    }

    this.$els.video.setAttribute('autoplay', true)
    this.$els.video.width = window.width
    this.$els.video.height = window.height
    this.$els.video.style.width = '100%'
    this.$els.video.style.height = '100%'
  }

  // check HTML api support
  isBrowserSupport () {
    dbg('isBrowserSupport')

    navigator.getUserMedia = (navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia ||
       navigator.msGetUserMedia)

    return navigator.getUserMedia !== null
  }

  getVideoDimensions () {
    return {
      width: this.$els.video.clientWidth,
      height: this.$els.video.clientHeight
    }
  }

  // get device in / out
  getSourceId () {
    dbg('getSourceId')
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          dbg('devices', devices)
          // Get camera from devices
          let device = devices.filter((device) => {
            return device.kind === 'videoinput'
          })[1]
          if (device) {
            this.videoOptions.video.optional.push({sourceId: device.deviceId})
            resolve()
          } else {
            console.log('no device detected')
            reject()
          }
        })
    })
  }

  // get videoinput stream & put it in video tag
  getStream () {
    dbg('getStream with constraints', this.videoOptions)

    return new Promise((resolve, reject) => {
      navigator.getUserMedia(this.videoOptions,
        (stream) => {
          document.getElementById('webglviewer').appendChild(this.$els.video)
          this.$els.video.src = window.URL.createObjectURL(stream)
          this.$els.video.play()
          resolve()
        },
        (err) => {
          console.log(err)
          reject()
        }
      )
    })
  }
}
