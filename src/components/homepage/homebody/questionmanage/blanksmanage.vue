<template>
  <div class="choicemanage">
    <div class="choicemanage-btn">
      <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEdit('add')">新增填空题</el-button>
    </div>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData.data"
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          fixed
          prop="question"
          label="题目"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分值"
          align="center">
        </el-table-column>
        <el-table-column
          prop="right_answer"
          label="正确答案"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="80"
          align="center">
          <template slot-scope="scope" v-if="!scope.row.inoperable">
            <!-- <el-button type="text" size="small" @click="addEdit('edit',scope.row)">编辑</el-button> -->
            <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>
    <add-blanks :visible.sync="formModel.visible" @getList="getList"></add-blanks>
  </div>
</template>
<script>
import axios from '../../../../axios'
import addBlanks from './addBlanks.vue'
export default {
  data () {
    return {
      tableData: {},
      loading: false,
      formModel: {
        visible: false
      }
    }
  },
  components: {
    addBlanks
  },
  mounted () {
    this.getBlanks()
  },
  methods: {
    getBlanks () {
      axios.get('/config/getBlanks')
      .then (data => {
        this.tableData = data.data
        console.log(data)
      })
    },
    addEdit (str) {
      if(str == 'add') {
        this.formModel.visible = true
      }
    },
    deleteOne (params) {
      let data = {
        id: params.id,
        action: 'delBlanks'
      }
      axios.post('/config/delQuestion', data)
      .then (data => {
        if(data.data.status == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getBlanks()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }

      })
    },
    getList (action) {
      // console.log(action)
      this.getBlanks()
    },
  }
}
</script>
<style lang="scss" scoped>
.choicemanage {
  margin-top: 20px;
  &-btn {
    margin-bottom: 20px;
    margin-left: 20px;
    float: left;
  }
}
</style>


