<template>
  <div class="screen social">
    <div class="social__infos">
      <p class="social__message">Partagez votre expérience sur les réseaux sociaux</p>
      <div class="social__separator"></div>
    </div>
    <ul class="social__items">
      <li class="social__item">
        <img src="../../static/img/icon/facebook.png" class="social__item__img">
        <p class="social__item__title">A vue d'oeil Experience</p>
      </li>
      <li class="social__item">
        <img src="../../static/img/icon/twitter.png" class="social__item__img">
        <p class="social__item__title">#avuedoeil</p>
      </li>
      <li class="social__item">
        <img src="../../static/img/icon/site.png" class="social__item__img">
        <p class="social__item__title">www.avuedoeil.fr</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/partials/_social.scss';
</style>

<script>
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
