const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  collapse: state => state.app.collapse,
  routers: state => state.app.routers,
  addRouters: state => state.route.addRouters,
};

export default getters
