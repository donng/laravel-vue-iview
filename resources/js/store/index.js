import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);

// load modules dynamically
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
  .map(file => {
    // get file name and store config
    return [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file).default]
  })
  .reduce((modules, [name, module]) => {
    // generate name:module object
    return { ...modules, [name]: module }
  }, {})

const store = new Vuex.Store({
  modules,
  getters,
});

export default store
