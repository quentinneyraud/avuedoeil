<template>
  <div id="app">
    <router-view transition-mode="in-out"></router-view>
  </div>
</template>

<script>
  import Splashscreen from './components/Splashscreen.vue'

  export default {
    components: {
      Splashscreen
    }
  }
</script>

<style lang="scss">
  @import './assets/style/reset.scss';
  @import './assets/style/general.scss';
</style>
