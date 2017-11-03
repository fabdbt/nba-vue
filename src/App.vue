<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <img src="./assets/logo.png">
        <ScoreBoard/>
      </div>
    </section>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard'
import 'bulma/css/bulma.css'

export default {
  name: 'app',
  components: {
    ScoreBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
