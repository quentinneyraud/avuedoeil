<template>
  <div class="screen tutovrComponent">
    <img class="tutovrComponent__smartphone" src="../../static/img/tutuvrComponent/smartphone.png" alt="" v-el:smartphone>
    <img class="tutovrComponent__fleche" src="../../static/img/tutuvrComponent/fleche.png" alt="" v-el:fleche>
    <img class="tutovrComponent__cardboard" src="../../static/img/tutuvrComponent/cardboard.png" alt="">
    <a class="tutovrComponent__instruction" v-link="{path: '/vr'}">Démarrer l'expérience</a>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/partials/_tuto.scss';
</style>

<script>
  import TweenMax from './../../node_modules/gsap/src/uncompressed/TweenMax'

  export default {
    data () {
      return {
      }
    },
    ready () {
      window.screen.lockOrientation('portrait')
      TweenMax.set([this.$els.smartphone, this.$els.fleche], {y: '-50%'})
      this.animateCardboard()
    },
    methods: {
      animateCardboard () {
        TweenMax.to(this.$els.smartphone, 2.5, {y: 50, yoyo: true, repeat: -1})
        TweenMax.to(this.$els.fleche, 2.5, {y: 20, yoyo: true, repeat: -1})
      }
    }
  }
</script>
