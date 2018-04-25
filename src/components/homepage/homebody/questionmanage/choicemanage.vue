<template>
  <div class="choicemanage">
    <div class="choicemanage-btn">
      <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEdit('add')">新增选择题</el-button>
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
          align="center"
          label="题目">
        </el-table-column>
        <el-table-column
          prop="score"
          align="center"
          label="分值">
        </el-table-column>
        <el-table-column
          prop="choiceA"
          align="center"
          label="选项A">
        </el-table-column>
        <el-table-column
          prop="choiceB"
          align="center"
          label="选项B">
        </el-table-column>
        <el-table-column
          prop="choiceC"
          align="center"
          label="选项C">
        </el-table-column>
        <el-table-column
          prop="choiceD"
          align="center"
          label="选项D">
        </el-table-column>
        <el-table-column
          prop="right_answer"
          align="center"
          label="正确选项">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="80">
          <template slot-scope="scope" v-if="!scope.row.inoperable">
            <!-- <el-button type="text" size="small" @click="addEdit('edit',scope.row)">编辑</el-button> -->
            <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>
    <add-choice :visible.sync="formModel.visible" @getList="getList"></add-choice>
  </div>
</template>
<script>
import axios from '../../../../axios'
import addChoice from './addChoice.vue'
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
    addChoice
  },
  mounted () {
    this.getChoice()
  },
  methods: {
    getChoice () {
      axios.get('/config/getChoice')
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
        action: 'delChoice'
      }
      axios.post('/config/delQuestion', data)
      .then (data => {
        if(data.data.status == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getChoice()
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
      this.getChoice()
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


