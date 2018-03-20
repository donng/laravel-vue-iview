const app = {
  state: {
    tags: [],
    collapse: true, //菜单栏伸缩
  },
  mutations: {
    collapse: (state) => {
      state.collapse = !state.collapse;
    },
    appendTag: (state, tag) => {
      if (state.tags.some(v => v.path === tag.path)) {
        return false;
      }

      state.tags.push({
        name: tag.name,
        path: tag.path,
        title: tag.meta.title || '未知页面'
      });
      // if (!tag.meta.noCache) {
      //   state.cachedtags.push(tag.name)
      // }
    },
  },
  actions: {
    collapse: ({ commit }) => commit('collapse'),

    appendTag: ({ commit }, tag) => commit('appendTag', tag)
  }
};

export default app

