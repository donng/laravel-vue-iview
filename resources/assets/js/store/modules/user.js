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
    async login({ commit }, userInfo) {
      const response = await login(userInfo.email, userInfo.password);
      if (response.access_token) {
        const token = response.access_token;
        setToken(token);
        commit('SET_TOKEN', token);
      } else {
        Message.error(response.error);
      }
    },
    async getUserInfo({ commit }) {
      getUserInfo().then(response => {
        commit('SET_USER', response.data);
      });
    },
    async logout({ commit }) {
      removeToken();
      commit('SET_TOKEN', '');
    }
  }
};

export default user
