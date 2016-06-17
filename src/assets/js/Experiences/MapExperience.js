import debug from 'debug'

const dbg = debug('avuedoeil:mapExperience')

export default class MapExperience {
  constructor (vrLayer) {
    dbg('Init Mapexperience')
    this.vrLayer = vrLayer
    this.active = false
  }

  begin () {
    dbg('begin')
    this.active = true
    this.showTutorial()
  }

  end () {
    this.active = false
  }

  showTutorial () {
    dbg('show tutorial')
    this.vrLayer.showTutorial('static/img/vrComponent/tutoriel4.png', 10000, this.showQuestion.bind(this))
  }

  showQuestion () {
    dbg('show question')
    this.vrLayer.showQuestion('static/img/vrComponent/question4.png', 14036, 6970, 17, 15)
    this.vrLayer.createButtons()
  }
}
