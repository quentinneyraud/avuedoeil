import debug from 'debug'
import MapExperience from './MapExperience'
import Beacon from './Beacon'

const dbg = debug('avuedoeil:experienceManager')

export default class ExperienceManager {
  construct (vrLayer) {
    dbg('Init ExperienceManager')

    this.experiences = null

    this.loadExperiences(vrLayer)

    this.beacon = new Beacon()
    this.beacon.watch()
    this.beacon.onDataReceived(this.onBeaconDatasReceived)
  }

  // Load all experiences
  loadExperiences (vrLayer) {
    dbg('load experiences')
    this.experiences.push(
      {
        identifier: 'MapExperience',
        experienceObject: new MapExperience(vrLayer)
      }
    )
  }

  onBeaconDatasReceived (beaconDatas) {
    dbg('beacon datas received', beaconDatas)

    if (beaconDatas) {
      // Get experience by identifier
      let experience = this.experiences.filter((experience) => {
        return experience.identifier === beaconDatas.identifier
      })

      // Begin experience
      if (experience) {
        dbg('Begin new experience', experience)
        experience.experienceObject.begin()
      }
    }
  }
}
