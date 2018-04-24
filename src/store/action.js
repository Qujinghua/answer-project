import api from '../axios'
import Vue from 'vue'
import router from '../router/index'
import * as types from './types'

export default {
  UserLogin({commit}, data) {
    commit(types.LOGIN, data)
  },
  UserLogout({commit}) {
    commit(types.LOGOUT)
  },
  UserSession({commit}, data) {
    commit(types.USERSESSION, data)
  },
  nowMenu({commit}, data) {
    commit(types.nowMenu, data)
  },
  breadCrumbOne({commit}, data) {
    commit(types.breadCrumbOne, data)
  },
  breadCrumbTwo({commit}, data) {
    commit(types.breadCrumbTwo, data)
  },
  topSideMenu({commit}, data) {
    commit(types.topSideMenu, data)
  },


}
