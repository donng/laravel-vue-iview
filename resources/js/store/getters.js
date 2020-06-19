const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  collapse: state => state.app.collapse,
  routers: state => state.router.routers,
  addRouters: state => state.router.addRouters,
};

export default getters
