<template>
  <div class='navigation-component'>
    <nav class='pagination is-small' role='navigation' aria-label='pagination'>
      <a class='pagination-previous' @click='onPrev' :disabled='fetching'>Previous</a>
      <a class='pagination-next' @click='onNext' :disabled='fetching'>Next</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    fetching: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    onNext () {
      this.$emit('onNext')
    },
    onPrev () {
      this.$emit('onPrev')
    }
  }
}
</script>

<style lang='scss' scoped>
nav > a {
  transition: .3s ease all;
}
</style>
