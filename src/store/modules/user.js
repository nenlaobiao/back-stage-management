const state = {
  userData: {}
}
const mutations = {
  setUserData (state, data) {
    state.userData = data
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
