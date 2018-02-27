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
    setToken: (state, token) => {
      state.token = token;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    setRoles: (state, roles) => {
      state.roles = ['admin'];
    }
  },
  actions: {
    async login({ commit }, userInfo) {
      const response = await login(userInfo.email, userInfo.password);

      if (response.access_token) {
        // login success
        const token = response.access_token;
        setToken(token);
        commit('setToken', token);
      } else {
        Message.error(response.error);
      }
    },
    async getUserInfo({ commit }) {
      const user = await getUserInfo();
      commit('setUser', user);
      // 测试数据
      commit('setRoles');
      return user;
    },
    async logout({ commit }) {
      removeToken();
      commit('setToken', '');
    }
  }
};

export default user
