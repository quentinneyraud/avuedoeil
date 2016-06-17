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
    this.showQuestion()
  }

  end () {
    this.active = false
  }

  showTutorial () {

  }

  showQuestion () {
    // this.vrLayer.showQuestion('./static/question3.png', 14035, 6970, 17, 15)
    this.vrLayer.createButtons()
    this.vrLayer.setListenerButtons((response) => {
      dbg(response)
    })
  }
}
