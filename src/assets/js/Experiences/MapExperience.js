import Experiences from './Experiences'

export default class MapExperience extends Experiences{
  constructor (vrLayer) {
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
    
  }

  end () {

  }

  showTutorial() {

  }

  showQuestion() {

  }
}
