const app = {
  state: {
    collapse: true, //菜单栏伸缩
  },
  mutations: {
    collapse: (state) => {
      state.collapse = !state.collapse;
    }
  },
  actions: {
    collapse: ({ commit }) => commit('collapse')
  }
};

export default app

