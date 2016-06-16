<template>
  <div transition="mytransition" class="maps screen">
    <h1>MAPS</h1>
    <a v-link="{ path: '/vr'} ">vr</a>
  </div>
</template>

<style>
</style>

<script>
  export default{
    data () {
      return {}
    },
    transitions: {
      mytransition: {
        css: false,
        enter: function (el, done) {
          done()
        }
      }
    }
  }
</script>
