<template>
  <div class="question">
    <div class="question-content">
      <div class="question-content-subject">
        {{ number+1 }}/{{ returnData.total }}、{{ question }}
      </div>
      <div class="question-content-answer" v-if="question_type == 'choice'">
        <el-radio-group :disabled="changed" v-model="radio" @change="choiceChange">
          <el-radio label="A">A、 {{ choiceA }}</el-radio>
          <el-radio label="B">B、 {{ choiceB }}</el-radio>
          <el-radio label="C">C、 {{ choiceC }}</el-radio>
          <el-radio label="D">D、 {{ choiceD }}</el-radio>
        </el-radio-group>
      </div>
      <div class="question-content-answer"  v-if="question_type == 'blank'">
        <el-input type="textarea" :rows="4" size="mini"></el-input>
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
      question_type: '',
      radio: '',
      number: 0,
      question: '',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      right_answer: '',
      returnData: {
        data: [],
        total: 0
      },
      isRightAnswer: false,
      disNext: false,
      changed: false
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getChoice () {
      return axios.get('/config/getChoice')
    },
    getBlanks () {
      return axios.get('/config/getBlanks')
    },
    getAll () {
      axios.all([this.getChoice(), this.getBlanks()])
      .then (axios.spread((res1,res2) => {
        this.returnData.data = res1.data.data.concat(res2.data.data)
        this.returnData.total = res1.data.total + res2.data.total
        this.nowQuestion(this.number)
      }))
    },
    nowQuestion (number) {
      if(this.returnData.data[number].question_type == 'choice') {
        this.choiceA = this.returnData.data[number].choiceA
        this.choiceB = this.returnData.data[number].choiceB
        this.choiceC = this.returnData.data[number].choiceC
        this.choiceD = this.returnData.data[number].choiceD
      }
      this.question = this.returnData.data[number].question
      this.right_answer = this.returnData.data[number].right_answer
      this.question_type = this.returnData.data[number].question_type
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



