const app = {
  state: {
    tags: [{
      name: 'home',
      path: '/home',
      title: '首页'
    }],
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
    },
    clearAllTags: (state) => {
      state.tags.splice(1);
    },
    clearOtherTags: (state, currentPageName) => {
      // 留下首页和当前页
      const currentPageIndex = state.tags.findIndex(tag =>  tag.name === currentPageName);

      if (currentPageIndex === 0) {
        state.tags.splice(1);
      } else {
        state.tags.splice(currentPageIndex + 1);
        state.tags.splice(1, currentPageIndex - 1);
      }
    },
    closeTag: (state, name) => {
      const tagIndex = state.tags.findIndex(tag => tag.name === name);
      state.tags.splice(tagIndex, 1);
    }
  },
  actions: {
    collapse: ({ commit }) => commit('collapse'),
    // 添加标签
    appendTag: ({ commit }, tag) => commit('appendTag', tag),
    // 清空所有标签
    clearAllTags: ({ commit }) => commit('clearAllTags'),
    // 清空其他标签
    clearOtherTags: ({ commit }, currentPageName) => commit('clearOtherTags', currentPageName),
    // 关闭当前标签
    closeTag: ({ commit }, name) => commit('closeTag', name),
  }
};

export default app

