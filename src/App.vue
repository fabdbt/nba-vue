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
    <footer class='footer'>
      <div class='container'>
        <div class='content has-text-centered'>
          <span>NBA scores -</span>
          <div class='social-sharing'>
            <social-sharing url='https://nba.now.sh'
                          title='Go check your NBA daily scores and schedule on'
                          hashtags='nba,vuejs,javascript'
                          twitter-user='fabdbt'
                          inline-template>
              <span>
                <network network='twitter'>
                  <a href='#' class='v-align'>
                    <icon name='twitter' scale='1' />
                  </a>
                </network>
              </span>
            </social-sharing>
            <a href='https://github.com/Apokly/nba-vue' target='_blank'>
              <icon name='github' scale='1' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import ScoreBoard from './components/ScoreBoard'
import VueLazyload from 'vue-lazyload'
import VueSocketio from 'vue-socket.io'
import 'bulma/css/bulma.css'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/github'

Vue.component('icon', Icon)
Vue.use(VueSocketio, 'http://localhost:8081')
Vue.use(VueLazyload)

export default {
  name: 'app',
  components: {
    ScoreBoard
  }
}
</script>

<style lang='scss'>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header.hero {
  -webkit-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.2);
  box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.2);
}

footer.footer {
  padding: 2rem 2rem !important;

  .social-sharing {
    display: inline;

    a {
      vertical-align: middle;
      transition: .2s ease color;
    }
  }
}
</style>
