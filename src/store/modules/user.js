// vuexde token存储的持久化
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api/user'
const getDefaultState = () => {
  return {
    token: getToken()
  }
}
const state = getDefaultState()
const mutations = {
  // 存token
  setToken(state, token) {
    state.token = token
    // 本地存储
    setToken(token)
  },
  // 删token
  removeToken(state) {
    state.token = null
    // 删除本地
    removeToken()
  }
}
const actions = {
  // 登录请求
  async login({ commit }, data) {
    const res = await loginAPI(data)
    //  提交commit 存储token
    commit('setToken', res.data.token)
  },

  // 退出登录
  loginout({ commit }) {
    //  删除token
    commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
