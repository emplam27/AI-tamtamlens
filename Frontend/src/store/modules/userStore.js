import axios from 'axios'
import cookies from 'vue-cookies'
import router from '@/router'

const SERVER_URL = process.env.VUE_APP_API_SERVER_URL
const userStore = {
  namespaced: true,
  state: {
    token: cookies.get('token'),
    user_nickname: cookies.get('nick'),
    companyid: cookies.get('companyId')
  },
  mutations: {
    setToken(state, data) {
      cookies.set('token', data)
      router.push('/home')
    },
    setNickname(state, nickname) {
      state.user_nickname = nickname
      cookies.set('nick', nickname)
    },
    setCompanyId(state, companyId) {
      state.companyId = companyId
      cookies.set('companyId', companyId)
    }
  },
  actions: {
    async login({ commit }, loginData) {
      await axios
        .post(`${SERVER_URL}/company/signin`, loginData)
        .then(response => {
          commit('setToken', response.data.token)
          commit('setNickname', response.data.company_nickname)
          commit('setCompanyId', response.data.company_id)
        })
        .catch(error => {
          alert('아이디 혹은 비밀번호를 확인해주세요.')
          console.log(error)
        })
    },
    logout() {
      cookies.remove('token')
      cookies.remove('nick')
      router.push('/login')
    }
  }
}

export default userStore
