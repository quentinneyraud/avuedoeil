import debug from 'debug'

const dbg = debug('avuedoeil:video')

export default class Video {

  constructor () {
    dbg('Init Video')

    this.videoOptions = {
      video: {
        optionnal: [
          {
            facingMode: 'environment'
          }
        ]
      }
    }

    this.initializeElements()
  }

  initializeElements () {
    dbg('initializeElements')
    this.$els = {
      video: document.createElement('video')
    }

    this.$els.video.setAttribute('autoplay', true)
  }

  isBrowserSupport () {
    dbg('isBrowserSupport')

    navigator.getUserMedia = (navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia ||
       navigator.msGetUserMedia)

    return true
  }

  getVideoDimensions () {
    return {
      width: this.$els.video.clientWidth,
      height: this.$els.video.clientHeight
    }
  }

  getSourceId () {
    dbg('getSourceId')

    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        // Get camera from devices
        let device = devices.filter((device) => {
          return device.kind === 'videoinput'
        })[0]
        if (device) {
          this.videoOptions.video.optionnal.push(device.deviceId)
        } else {
          console.log('no device detected')
        }
      })
  }

  getStream () {
    dbg('getStream')

    return new Promise((resolve, reject) => {
      navigator.getUserMedia(this.videoOptions,
        (stream) => {
          document.body.appendChild(this.$els.video)
          this.$els.video.src = window.URL.createObjectURL(stream)
          this.$els.video.style.width = '100%'
          this.$els.video.style.height = '100%'
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
