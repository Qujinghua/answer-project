<template>
  <div class="homepage">
    <home-header></home-header>
    <!-- <div class="container"> -->
      <home-body></home-body>
    <!-- </div> -->
  </div>
</template>
<script>
import homeHeader from "./header.vue"
import homeBody from "./homebody/index.vue"
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    homeHeader,
    homeBody
  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container{
  overflow: hidden;
}
</style>


