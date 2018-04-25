<template>
  <div class="homepage">
    <div class="homepage-header">
      <div class="homepage-header-left">
        <span @click="toHome"><i class="el-icon-arrow-left"></i>首页</span>
      </div>
      <div class="homepage-header-middle" v-if="isSuper=='1'">
        <el-dropdown @command="dropdownQuestion">
          <span class="homepage-header-middle-content">
            题目管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align:center">
            <el-dropdown-item command="blanks">填空题</el-dropdown-item>
            <el-dropdown-item command="choice">选择题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="homepage-header-right">
        <el-dropdown @command="dropdown">
          <span class="homepage-header-right-content">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align:center">
            <!-- <el-dropdown-item command="modifyInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="modifyInfoPass">修改密码</el-dropdown-item> -->
            <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {
      username: '',
      isSuper: ''
    }
  },
  mounted () {
    this.getUsername()

  },
  methods: {
    getUsername () {
      this.username = sessionStorage.getItem('username')
      this.isSuper = sessionStorage.getItem('isSuper')
    },

    toHome () {
      this.$router.push('/homepage/catalog')
    },
    dropdownQuestion (str) {
      if(str == 'blanks') {
        this.$router.push('/homepage/blanksmanage')
      } else {
        this.$router.push('/homepage/choicemanage')
      }
    },
    dropdown (str) {
      switch(str) {
        case 'userLogout':
        this.$store.dispatch({type:'UserLogout'})
        // this.$store.dispatch({type:'topSideMenu', topSideMenu: ''})
        this.$message({
          message: '退出成功',
          type: 'success'
        })
        this.$router.push('/login')
        break
        case 'modifyInfo':
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios.post('/config/personalInfo',{username:sessionStorage.getItem('username')})
        .then(data => {
          loading.close();
          // console.log(data.data.data[0])
          this.formModel.action = 'personalInfo'
          this.formModel.receiveForm = data.data.data[0]
          this.formModel.visible = true
        })
        break
        case 'modifyInfoPass':
        this.formModel2.action = 'personalInfoPass'
        this.formModel2.receiveForm.id = sessionStorage.getItem('userid')
        this.formModel2.receiveForm.newPwd = ''
        this.formModel2.receiveForm.checkNewPwd = ''
        this.formModel2.visible = true
        break
        default:
        break
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  &-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    color: #606266;
    font-size: 14px;
    &-left {
      margin-left: 10px;
      cursor: pointer;
    }
    &-middle {
      &-content {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
        width: 86px;
        height: 100%;
        background: #fff;
      }
    }
    &-right {
      &-content {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
        width: 100px;
        height: 100%;
        background: #fff;
      }
    }

  }
}
</style>


