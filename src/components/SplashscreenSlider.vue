<template>
  <div class="splashscreenslider">
    <div class="splashscreenslider__items">
      <div v-for="item in items" class="splashscreenslider__item">
        <p>{{ item }}</p>
      </div>
    </div>
    <div class="splashscreenslider__bullets">
      <span v-for="item in items" @click="onBulletClick" data-slide="{{$index}}"
            class="splashscreenslider__bullet"></span>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/partials/_splashscreenslider.scss';
</style>

<script>
  import {splashscreenSlider} from '../Store'

  export default{
    data () {
      return {
        items: splashscreenSlider.messages
      }
    },
    methods: {
      onBulletClick (event) {
        let slide = event.target.dataset.slide
        console.log(slide)
      }
    }
  }
</script>
