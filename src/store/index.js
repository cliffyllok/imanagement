import Vue from "vue";
import Vuex from "vuex";
import format from "date-fns/format";
import addWeeks from "date-fns/add_weeks";
// import inventory from "./module/Inventory/index";
// import stockMovements from "./module/StockMovements/index";
// import login from "./module/Login/index";
import { mutations } from "./mutations";
import { actions } from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // modules: {
  //   login: login,
  //   stockMove: stockMovements,
  //   stock: inventory
  // },
  state: {
    loading: false,
    user: null,
    stockMovements: null,
    loadedProduct: null,
    loadedUsers: [],
    fbError: "",
    hideNav: false,
    loc: "",
    showMonth: false,
    scancodeFound: false,
    loadedScancode: "",
    message: "",
    messageSuccess: "",
    addItem: false,
    defaultSellByDate: format(addWeeks(new Date(), 520), "YYYY-MM-DD")
  },
  mutations,
  actions,
  getters
});
