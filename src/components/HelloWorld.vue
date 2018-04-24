<template>
  <div class="hello">
    <div class="hello-register">
      <el-button @click="register" type="primary" round>注册</el-button>
    </div>
    <div class="hello-register">
      <el-button @click="login" type="primary" round>登录</el-button>
    </div>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  padding-top: 20%;
  & button {
    width: 100px;
  }
  &-register {
    margin-bottom: 20px;
  }
}
</style>
