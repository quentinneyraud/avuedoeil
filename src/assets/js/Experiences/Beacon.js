import debug from 'debug'

const dbg = debug('avuedoeil:beacon')

/* global cordova */
export default class Beacon {
  constructor () {
    dbg('Init beacons')
    // this.currentExperience = null
    this.delegate = null
    this.beacons = {
      uuid: '00000000-1111-2222-3333-444444444444',
      identifier: 'MapExperience',
      minor: 48643,
      major: 22238
    }
  }

  watch () {
    dbg('watch')
    this.delegate = new cordova.plugins.locationManager.Delegate()
    cordova.plugins.locationManager.setDelegate(this.delegate)

    // Declare regions
    let beaconRegion = new cordova.plugins.locationManager.BeaconRegion(this.beacons.identifier, this.beacons.uuid, this.beacons.major, this.beacons.minor)
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
      .fail(function (e) { console.error(e) })
      .done()
  }

  onDataReceived (cb) {
    dbg('data received')
    this.delegate.didRangeBeaconsInRegion = function (results) {
      // Sometimes, beacons are not detected
      if (results.beacons.length > 0) {
        dbg(results.beacons)
        // let sorted = results.beacons.sort((a, b) => a.accuracy < b.accuracy)
        cb(true)
      }
    }
  }
}
