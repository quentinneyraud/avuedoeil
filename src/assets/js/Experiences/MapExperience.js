import debug from 'debug'

const dbg = debug('avuedoeil:mapExperience')

export default class MapExperience {
  constructor (vrLayer) {
    dbg('Init Mapexperience')
    this.vrLayer = vrLayer
    this.setData()
  }

  setData () {
    this.data = {
      question: 'http://www.placehold.it/20x20',
      answer: ['OUI', 'NON']
    }
  }

  begin () {
    dbg('begin')
    this.showQuestion()
  }

  end () {

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
