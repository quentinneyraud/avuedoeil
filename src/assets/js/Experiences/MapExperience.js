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
    this.vrLayer.showTutorial('static/img/vrComponent/tutoriel_4_1.png', 7000, () => {
      this.vrLayer.showTutorial('static/img/vrComponent/tutoriel_4_2.png', 7000, () => {
        this.vrLayer.showTutorial('static/img/vrComponent/tutoriel_4_3.png', 7000, () => {
          document.getElementById('overlay').className = 'active'
          window.setTimeout(() => {
            this.showQuestion()
          }, 30000)
        })
      })
    })
  }

  showQuestion () {
    dbg('show question')
    this.vrLayer.showQuestion('static/img/vrComponent/q4.png')
    this.vrLayer.createButtons()
  }
}
