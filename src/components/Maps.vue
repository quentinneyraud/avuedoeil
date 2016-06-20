<template>
  <div class="mapsComponent screen">
    <h1 class="mapsComponent__city-name" v-el:city>{{ currentCity }}</h1>
    <div class="mapsComponent__arrows">
      <svg xmlns="http://www.w3.org/2000/svg" class="mapsComponent__arrows__arrow-left" v-on:click="updateSlider(-1)" v-bind:class="{ 'hidden': slideIndex === 0 }" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M187.5,345.6c-2.5,0-5-0.7-7.1-1.9c-4.1-2.4-6.6-6.7-6.6-11.3V179.8c0-4.7,2.4-8.9,6.6-11.3c4.2-2.5,9.5-2.6,13.9-0.2  l139.3,76.2c4.4,2.4,7,6.7,7,11.6c0,4.9-2.6,9.2-7,11.6l-139.3,76.2C192.1,345,189.8,345.6,187.5,345.6z M187.5,178.5  c-0.5,0-0.9,0.2-1,0.3c-0.4,0.3-0.7,0.6-0.7,1v152.5c0,0.4,0.2,0.8,0.7,1c0.2,0.1,1.1,0.5,2,0l139.3-76.2c0.5-0.3,0.7-0.6,0.7-1.1  c0-0.4-0.2-0.8-0.7-1l-139.3-76.2C188.1,178.6,187.8,178.5,187.5,178.5z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="mapsComponent__arrows__arrow-right" v-on:click="updateSlider(1)" v-bind:class="{ 'hidden': slideIndex === 2 }" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M187.5,345.6c-2.5,0-5-0.7-7.1-1.9c-4.1-2.4-6.6-6.7-6.6-11.3V179.8c0-4.7,2.4-8.9,6.6-11.3c4.2-2.5,9.5-2.6,13.9-0.2  l139.3,76.2c4.4,2.4,7,6.7,7,11.6c0,4.9-2.6,9.2-7,11.6l-139.3,76.2C192.1,345,189.8,345.6,187.5,345.6z M187.5,178.5  c-0.5,0-0.9,0.2-1,0.3c-0.4,0.3-0.7,0.6-0.7,1v152.5c0,0.4,0.2,0.8,0.7,1c0.2,0.1,1.1,0.5,2,0l139.3-76.2c0.5-0.3,0.7-0.6,0.7-1.1  c0-0.4-0.2-0.8-0.7-1l-139.3-76.2C188.1,178.6,187.8,178.5,187.5,178.5z"/></svg>
    </div>
    <div class="mapsComponent__maps" v-el:maps v-on:click="showInfos()">
      <div class="mapsComponent__maps__map">
        <div class="mapsComponent__user-location"></div>
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp1">
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp2">
      </div>
      <div class="mapsComponent__maps__map">
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp3">
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp4">
      </div>
      <div class="mapsComponent__maps__map">
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp5">
        <img src="../../static/img/mapsComponent/experience_location.png" class="mapsComponent__experiences-location" id="exp6">
      </div>
    </div>
    <div class="mapsComponent__infos" v-el:infos>
      <img class="mapsComponent__infos__vr" src="../../static/img/mapsComponent/cardboardhover.png" v-on:click="goToVr()" alt="">
      <img class="mapsComponent__infos__share" src="../../static/img/mapsComponent/share.png" v-on:click="goToShare()" alt="">
    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/partials/_maps.scss';
</style>

<script>
  import TweenMax from './../../node_modules/gsap/src/uncompressed/TweenMax'
  import Ease from './../../node_modules/gsap/src/uncompressed/easing/EasePack'

  export default{
    data () {
      return {
        cities: ['Lyon', 'Paris', 'Marseille'],
        slideIndex: 0
      }
    },
    ready () {
      window.screen.lockOrientation('portrait')
      TweenMax.staggerFromTo(this.$els.cursor, 0.2, {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0})
    },
    methods: {
      updateCity (direction) {
        TweenMax.to(this.$els.city, 0.4, {y: '-100%', autoAlpha: 0, ease: Ease.Back.easeIn.config(1.5), yoyo: true, repeat: 1, repeatDelay: 0.2, onRepeat: () => {
          this.slideIndex += direction
        }})
      },
      updateMap (direction) {
        TweenMax.to(this.$els.maps, 0.7, {x: '-=' + direction * window.innerWidth + 'px', ease: Ease.Power2.easeIn})
      },
      updateSlider (direction) {
        if (!(this.slideIndex === 0 && direction === -1) && !(this.slideIndex === 2 && direction === 1)) {
          this.updateCity(direction)
          this.updateMap(direction)
        }
      },
      showInfos () {
        TweenMax.to(this.$els.infos, 0.5, {y: 0, ease: Ease.Back.easeOut.config(0.8)})
      },
      goToVr () {
        this.$router.go('/tutovr')
      },
      goToShare () {
        this.$router.go('/social')
      }
    },
    computed: {
      currentCity () {
        return this.cities[Math.abs(this.slideIndex) % this.cities.length]
      }
    }
  }
</script>
