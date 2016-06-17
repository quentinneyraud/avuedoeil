import debug from 'debug'
import { beaconConfig } from './beaconConfig'

const dbg = debug('avuedoeil:beacon')

/* global cordova */
export default class Beacon {
  constructor () {
    dbg('Init beacons')
    // this.currentExperience = null
    this.delegate = null
    this.beacons = beaconConfig[0]
  }

  // start watching beacon signal
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

  // set listener on data received
  onDataReceived (cb) {
    dbg('data received')
    this.delegate.didRangeBeaconsInRegion = cb
  }
}
