import Cookies from 'js-cookie'
import { login } from 'api/login'

const user = {
  state: {
    user: null,
    token: Cookies.get('token')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      login(...userInfo).then(response => {

      })
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  }
};

export default user
