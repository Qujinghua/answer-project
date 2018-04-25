<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="600px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="90px" v-loading="loading">
      <el-form-item label="题目" prop="question" >
        <el-input v-model="form.question" type="textarea" :rows="2" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="分数" prop="score" >
        <el-input v-model="form.score" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="选项A" prop="choiceA" >
        <el-input v-model="form.choiceA" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="选项B" prop="choiceB" >
        <el-input v-model="form.choiceB" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="选项C" prop="choiceC" >
        <el-input v-model="form.choiceC" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="选项D" prop="choiceD" >
        <el-input v-model="form.choiceD" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="right_answer" >
        <el-radio-group v-model="form.right_answer">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../axios'
const defaultForm = {
  question: '',
  score: 10,
  choiceA: '',
  choiceB: '',
  choiceC: '',
  choiceD: '',
  right_answer: ''
}
export default {
  props: {
    visible: ''
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机号码'));
        }
        callback()
      }

    };
    return {
      loading: false,
      form: {...defaultForm},
      rules2: {
        name: [
          { required: true, message:'请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { validator:checkPhone, trigger: 'blur' }
        ],
        email: [
          // { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {

    }
  },
  computed: {
    title () {
      return '新增选择题'
    },
  },
  mounted () {
    
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
    },
    submitForm (form) {
      this.form.action = 'addChoice'
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/addQuestion',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: data.data.message,
                type: 'success'
              })
              this.$emit('getList', this.action)
            }
          })
        } else {
          return false
        }
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>


