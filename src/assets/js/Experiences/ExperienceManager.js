import debug from 'debug'
// import Beacon from './Beacon'
import { beaconConfig } from './beaconConfig'
import MapExperience from './MapExperience'

const dbg = debug('avuedoeil:experienceManager')
const EXPERIENCE_DISTANCE = 1.75

export default class ExperienceManager {
  constructor (vrLayer) {
    dbg('Init ExperienceManager')

    this.experiences = []

    this.loadExperiences(vrLayer)

    // this.beacon = new Beacon()
    // this.beacon.watch()
    // this.beacon.onDataReceived(this.onBeaconDatasReceived.bind(this))

    setTimeout(() => {
      this.experiences[0].object.begin()
    })
  }

  // Load all experiences
  loadExperiences (vrLayer) {
    dbg('load experiences')
    this.experiences = beaconConfig.map((beacon) => {
      return {
        uuid: beacon.uuid,
        object: new MapExperience(vrLayer) // TODO: issue on new beacon.identifier()
      }
    })
  }

  onBeaconDatasReceived (beaconDatas) {
    // dbg('beacon datas received')

    if (this.isOneExperienceRunning()) {
      return false
    }

    // Sometimes, beacon is not detected
    if (beaconDatas.beacons.length > 0) {
      // Sort by distance ascending
      let sorted = beaconDatas.beacons.sort((a, b) => a.accuracy - b.accuracy)
      // Start experience
      if (sorted[0].accuracy < EXPERIENCE_DISTANCE) {
        let experience = this.experiences.find((experience) => {
          return experience.uuid === sorted[0].uuid
        })
        if (experience) {
          dbg('Begin new experience', experience)
          experience.object.begin()
        }
      }
    }
  }

  isOneExperienceRunning () {
    // dbg('isOneExperienceRunning')
    for (let experience of this.experiences) {
      if (experience.object.active) {
        return true
      }
    }
    return false
  }
}
