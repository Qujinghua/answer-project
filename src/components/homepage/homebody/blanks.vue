<template>
  <div class="question">
    <div class="question-content">
      <div class="question-content-subject">
        {{ number+1 }}/{{ returnData.total }}、{{ question }}
      </div>
      <div class="question-content-answer">
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
      radio: '',
      number: 0,
      question: '',
      right_answer: '',
      returnData: {},
      isRightAnswer: false,
      disNext: false,
    }
  },
  mounted () {
    this.getBlanks()
  },
  methods: {
    getBlanks () {
      axios.get('/config/getBlanks')
      .then (data => {
        if(data && data.status == 200) {
          this.returnData = data.data
          if(data.data.total == 1) {
            this.disNext = true
          }
          this.nowQuestion(this.number)
        }
        
      })
    },
    nowQuestion (number) {
      this.question = this.returnData.data[number].question
      this.right_answer = this.returnData.data[number].right_answer
    },
    seeRight () {
      this.isRightAnswer = true
    },
    nextQuestion () {
      this.number++
      this.nowQuestion(this.number)
      this.isRightAnswer = false
      if(this.number>=this.returnData.data.length-1) {
        this.disNext = true
      }
    },
    // choiceChange () {
    //   if(this.radio == this.right_answer) {
    //     this.$message({
    //       message: '正确！',
    //       type: 'success'
    //     })
    //   } else {
    //     this.$message({
    //       message: '错误！',
    //       type: 'error'
    //     })
    //     this.isRightAnswer = true
    //   }
    // }
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



