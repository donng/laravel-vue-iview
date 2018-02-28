const app = {
  state: {
    collapse: true, //菜单栏伸缩
    tagsList: []
  },
  mutations: {
    collapse: (state) => {
      state.collapse = !state.collapse;
    },
    addTags: (state, view) => {
      if (state.tagsList.some(v => v.path === view.path)) return;
      state.tagsList.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      });
      // if (!view.meta.noCache) {
      //   state.cachedViews.push(view.name)
      // }
    },
  },
  actions: {
    collapse: ({ commit }) => commit('collapse'),
    addTags: ({ commit }, view) => commit('addTags', view)
  }
};

export default app

