<template>
  <div id='app'>
    <header class='hero is-light'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>
            NBA scores
          </h1>
        </div>
      </div>
    </header>
    <section class='section'>
      <div class='container'>
        <ScoreBoard/>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import ScoreBoard from './components/ScoreBoard'
import VueLazyload from 'vue-lazyload'
import 'bulma/css/bulma.css'

Vue.component('icon', Icon)
Vue.use(VueLazyload)

export default {
  name: 'app',
  components: {
    ScoreBoard
  }
}
</script>

<style>
#app {
  font-family: 'Barlow', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header.hero {
  -webkit-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.3);
  box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.3);
}
</style>
