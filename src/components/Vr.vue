<template>
  <div class="vr">
    <div id="webglviewer"></div>
  </div>
</template>

<style>
  #webglviewer {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
  }
  video{
    position: absolute;
    z-index: -50;
    visibility: hidden;
  }
</style>

<script>
  import Vr from '../assets/js/Vr/index'

  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    ready () {
      window.screen.lockOrientation('landscape')
      let vr = new Vr()
      console.log(vr)
    }
  }
</script>
