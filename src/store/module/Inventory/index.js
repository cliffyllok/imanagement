import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

const state = {
  products: [{ productA: "a" }]
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
