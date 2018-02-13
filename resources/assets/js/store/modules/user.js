import { Message } from 'iview'
import { login, getUserInfo } from 'api/login'
import { setToken, getToken, removeToken } from "utils/storage";

const user = {
  state: {
    user: null,
    roles: [],
    token: getToken()
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
      return new Promise((resolve, reject) => {
        login(userInfo.email, userInfo.password).then(response => {
          if (response.access_token) {
            const token = response.access_token;
            setToken(token);
            commit('SET_TOKEN', token);
            resolve()
          } else {
            Message.error(response.error);
          }
        })
      });
    },
    async getUserInfo({ commit }) {
      getUserInfo().then(response => {
        console.log(response);
        commit('SET_USER', response.data);
      });
    },
    // 前端登出
    async logout({ commit }) {
      removeToken();
      commit('SET_TOKEN', '');
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  }
};

export default user
