<template>
  <div class="mapsComponent screen">
    <h1 class="mapsComponent__city-name" v-el:city>{{ currentCity }}</h1>
    <div class="mapsComponent__arrows">
      <span class="mapsComponent__arrows__arrow-left" v-on:click="updateSlider(-1)">g</span>
      <span class="mapsComponent__arrows__arrow-right" v-on:click="updateSlider(1)">d</span>
    </div>
    <div class="mapsComponent__maps" v-el:map>
      <div class="mapsComponent__maps__map" v-for="x in 3" v-on:click="goToVr()"></div>
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
        index: 0
      }
    },
    ready () {
      window.screen.lockOrientation('portrait')
    },
    methods: {
      updateCity (direction) {
        TweenMax.to(this.$els.city, 0.4, {y: '-100%', autoAlpha: 0, ease: Ease.Back.easeIn.config(1.5), yoyo: true, repeat: 1, repeatDelay: 0.2, onRepeat: () => {
          this.index += direction
        }})
      },
      updateMap (direction) {
        TweenMax.to(this.$els.map, 0.7, {x: '+=' + direction * window.innerWidth + 'px', ease: Ease.Power2.easeIn})
      },
      updateSlider (direction) {
        this.updateCity(direction)
        this.updateMap(direction)
      },
      goToVr () {
        this.$router.go('/vr')
      }
    },
    computed: {
      currentCity () {
        return this.cities[Math.abs(this.index) % this.cities.length]
      }
    }
  }
</script>
