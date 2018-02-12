import { login } from 'api/login'
import { setToken, getToken } from "utils/storage";

const user = {
  state: {
    user: null,
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
          const token = response.access_token;

          setToken(token);
          commit('SET_TOKEN', token);
          resolve()
        })
      });
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  }
};

export default user
