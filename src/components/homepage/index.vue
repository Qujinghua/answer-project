<template>
  <div class="homepage">
    <div class="homepage-header">{{username}}</div>
    <div class="homepage-content">
      <div class="homepage-content-question">
        <div class="homepage-content-question-subject">
          机动车驾驶人违法驾驶造成重大交通事故构成犯罪的，依法追究什么责任？
        </div>
        <div class="homepage-content-question-answer">
          <el-radio-group v-model="radio">
            <el-radio :label="3">备选项A</el-radio>
            <el-radio :label="6">备选项B</el-radio>
            <el-radio :label="9">备选项C</el-radio>
            <el-radio :label="10">备选项D</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../axios'
export default {
  data() {
    return {
      username: '',
      radio: 3
    }
  },
  mounted () {
    this.getUsername()
    this.getQuestion()
  },
  methods: {
    getUsername () {
      this.username = sessionStorage.getItem('username')
    },
    getQuestion () {
      axios.get('/config/getQuestion')
      .then (data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  &-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>


