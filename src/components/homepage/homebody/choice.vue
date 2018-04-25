<template>
  <div class="question">
    <div class="question-content">
      <div class="question-content-subject">
        {{ number+1 }}/{{ returnData.total }}、{{ question }}
      </div>
      <div class="question-content-answer">
        <el-radio-group :disabled="changed" v-model="radio" @change="choiceChange">
          <el-radio label="A">A、 {{ choiceA }}</el-radio>
          <el-radio label="B">B、 {{ choiceB }}</el-radio>
          <el-radio label="C">C、 {{ choiceC }}</el-radio>
          <el-radio label="D">D、 {{ choiceD }}</el-radio>
        </el-radio-group>
      </div>
      <div class="question-content-next">
        <el-button plain @click="nextQuestion" :disabled="disNext">下一题</el-button>
        <el-button plain @click="seeRight">查看正确答案</el-button>
      </div>
      <div class="question-content-right" v-if="isRightAnswer">
        正确答案：{{ right_answer }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../../axios'
export default {
  data () {
    return {
      radio: '',
      number: 0,
      question: '',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      right_answer: '',
      returnData: {},
      isRightAnswer: false,
      disNext: false,
      changed: false
    }
  },
  mounted () {
    this.getChoice()
  },
  methods: {
    getChoice () {
      axios.get('/config/getChoice')
      .then (data => {
        if(data && data.status == 200) {
          this.returnData = data.data
          this.nowQuestion(this.number)
        }
        
      })
    },
    nowQuestion (number) {
      this.question = this.returnData.data[number].question
      this.choiceA = this.returnData.data[number].choiceA
      this.choiceB = this.returnData.data[number].choiceB
      this.choiceC = this.returnData.data[number].choiceC
      this.choiceD = this.returnData.data[number].choiceD
      this.right_answer = this.returnData.data[number].right_answer
    },
    seeRight () {
      this.isRightAnswer = true
    },
    nextQuestion () {
      this.changed = false
      this.radio = ''
      this.number++
      this.nowQuestion(this.number)
      this.isRightAnswer = false
      if(this.number>=this.returnData.data.length-1) {
        this.disNext = true
      }
    },
    choiceChange () {
      if(this.radio == this.right_answer) {
        this.$message({
          message: '正确！',
          type: 'success'
        })
      } else {
        this.$message({
          message: '错误！',
          type: 'error'
        })
        this.isRightAnswer = true
      }
      this.changed = true
    }
  }
}
</script>
<style lang="scss" scoped>
.question {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  &-content {
    width: 80%;
    &-subject {
      text-align: left;
    }
    &-answer {
      margin-top: 15px;
      & .el-radio-group {
        display: flex;
        text-align: left;
        flex-direction: column;
        & label {
          margin-left: 0;
          margin-bottom: 15px;
        }
      }
    }
    &-next {
      margin-top: 20px;
    }
    &-right {
      margin-top: 20px;
      text-align: left;
    }
  }
}
</style>



