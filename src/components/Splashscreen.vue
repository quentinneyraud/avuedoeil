<template>
  <div class="splashscreenComponent screen">
    <img v-el:logo class="splashscreenComponent__logo" src="../../static/img/logo.png" alt="">
    <div v-el:loader class="splashscreenComponent__loader">
      <div v-el:loading-bar class="splashscreenComponent__loader__loaded" id="js-loading_bar"></div>
    </div>
    <h1 v-el:title class="splashscreenComponent__title">{{ title }}</h1>
    <h2 v-el:sub-title class="splashscreenComponent__subtitle">{{ subtitle }}</h2>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/partials/_splashscreen.scss';
</style>

<script>
  import TweenMax from './../../node_modules/gsap/src/uncompressed/TweenMax'
  import TimelineMax from './../../node_modules/gsap/src/uncompressed/TimelineMax'
  import Ease from './../../node_modules/gsap/src/uncompressed/easing/EasePack'

  export default{
    data () {
      return {
        title: 'Le glaucôme,',
        subtitle: 'Une histoire de temps'
      }
    },
    ready () {
//      window.screen.lockOrientation('portrait')
      TweenMax.set([this.$els.title, this.$els.subTitle], {autoAlpha: 0})
      TweenMax.set([this.$els.loader, this.$els.subTitle], {x: '-50%'})
      this.load(this.animate)
    },
    methods: {
      load (onComplete) {
        TweenMax.to(this.$els.loadingBar, 2.5, {
          width: '100%',
          ease: Ease.SlowMo.ease.config(0.3, 0.7, false),
          onComplete: onComplete
        })
      },
      animate () {
        let start = 0
        let duration = 0.9
        new TimelineMax()
          .to(this.$els.logo, duration, {scale: 0.7, y: '-=100'}, start)
          .to([this.$els.title, this.$els.subTitle], duration, {autoAlpha: 1, y: '-=100'}, start)
          .to(this.$els.loader, duration, {width: '35%', y: '-=135'}, start)
          .call(this.goToMaps, null, this, 2.5)
      },
      goToMaps () {
        this.$router.replace('/maps')
      }
    }
  }
</script>
