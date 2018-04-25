<template>
  <div class="choice">
    <router-link to="/homepage/blanks">
      <el-button type="primary">填空题</el-button>
    </router-link>
    <router-link to="/homepage/choice">
      <el-button type="primary">选择题</el-button>
    </router-link>
    <router-link to="/homepage/practice">
      <el-button type="primary">顺序练习</el-button>
    </router-link>
    <router-link to="/homepage/exam">
      <el-button type="primary">模拟考试</el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  & button {
    width: 200px;
    margin-top: 20px;
    margin-left: 0;
  }
}
</style>



