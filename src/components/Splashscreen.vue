<template>
  <div class="splashscreen screen" transition="mytransition">
    <img v-el:logo class="splashscreen__logo" src="../assets/img/logo.png" alt="">
    <div v-el:loader class="splashscreen__loader">
      <div v-el:loading-bar class="splashscreen__loader__loaded" id="js-loading_bar"></div>
    </div>
    <h1 v-el:title class="splashscreen__title">{{ title }}</h1>
    <h2 v-el:sub-title class="splashscreen__subtitle">{{ subtitle }}</h2>
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
          .to(this.$els.loader, duration, {width: '35%', y: '-=100'}, start)
          .call(this.goToMaps, null, this, 2.5)
      },
      goToMaps () {
        this.$router.go('/maps')
      }
    },
    transitions: {
      mytransition: {
        css: false,
        leave: function (el, done) {
          TweenMax.to(el, 10, {y: '-=150', autoAlpha: 0, onComplete: done()})
        }
      }
    }
  }
</script>
