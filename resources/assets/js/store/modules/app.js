const app = {
  state: {
    collapse: true, //菜单栏伸缩
  },
  mutations: {
    CHANGE_COLLAPSE: (state) => {
      state.collapse = !state.collapse;
    }
  },
  actions: {
    async collapse({ commit }) {
      commit('CHANGE_COLLAPSE');
    }
  }
};

export default app

