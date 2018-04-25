<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
  .content {
    width: 80%;
    height: 90%;
    box-shadow: 4px 4px 8px rgba(126, 101, 101, 0.8),
                -4px -4px 8px rgba(155, 130, 130, 0.8);
    border-radius: 3px;
    border: 1px solid #e6e6e6;
  }
}
</style>
