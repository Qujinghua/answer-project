import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
// import sidebarchange from './sidebarchange/change'

Vue.use(Vuex);

const state = {
  token: null,
  activeName: 'first',
  username: '',
  nowMenu: '1-1',
  breadCrumbOne: '工作计划管理',
  breadCrumbTwo: '新添工作计划',
  topSideMenu: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

