<template>
  <div class="login">
    <div class="login-content">
      <div class="login-content-form">
        <h2>注册</h2>
        <el-form :model="form" ref="form"  label-width="80px">
          <el-form-item label="用户名" prop="username" :rules="rules.username">
            <el-input type="text" size="mini" v-model="form.username" placeholder="用户名" @keyup.enter.native="submitForm('form')"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" :rules="rules.pwd">
            <el-input type="password" size="mini" v-model="form.pwd" placeholder="密码" @keyup.enter.native="submitForm('form')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">注册</el-button>
            <router-link to="/login">
              <el-button plain>已有账号？去登录<i class="el-icon-d-arrow-right"></i></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>


  </div>

</template>

<script>
import * as types from '../../store/types'
import axios from '../../axios'
export default {
  data () {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空'}],
        pwd: [{ required: true, message: '用户名不能为空'}],
      },
      form: {
        action: 'add',
        username: '',
        pwd: ''
      }
    }
  },
  created() {
    // this.test()
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios.post('/config/userRegister',this.form)
          .then(data => {
            if (data && data.status == 200) {
              this.$message({
                message: '恭喜你，注册成功！',
                type: 'success'
              })
              // this.$store.dispatch({type:'UserSession', userSession:data.data})
              this.$router.push('/login')
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              });
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (form) {
      this.$refs[form].resetFields();
    },
    // test () {
    //   api.getUser()
    //   .then (data => {
    //     console.log(data)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  // position: absolute;
  width: 100%;
  height: 100%;
  &-content{
    border-radius:5px;
    // box-shadow: 4px 4px 8px rgba(126, 101, 101, 0.8),
    //             -4px -4px 8px rgba(155, 130, 130, 0.8);
    width: 50%;
    height: 90%;
    // background-image: url("../../assets/banner.jpg"); will-change: transform; transform: perspective(1000px) rotateX(-0.8deg) rotateY(-0.02deg) scale3d(1, 1, 1);
    // background-image: url("../../assets/banner.jpg");
    // background-size: 100%;
    overflow: hidden;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    & h2 {
      color: #565a61
    }
    &-form {
      position: absolute;
      background: #FFFFFF;
      padding: 40px 30px 30px 30px;
      border-radius: 5px;
      width: 350px;
      float: right;
    }
  }

}
</style>


