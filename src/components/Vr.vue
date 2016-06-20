<template>
  <div class="vr">
    <div id="webglviewer">
      <div id="overlay"></div>
    </div>
  </div>
</template>

<style lang="scss">
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
  #overlay{
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    &.active{
       background-color: rgba(255, 255, 255, 0.1);
    }
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
