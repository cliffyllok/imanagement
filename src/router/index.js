import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import MainPage from "../components/MainPage";
import Products from "../components/Products.vue";
import ProductsSellBy from "../components/ProductsSellBy.vue";
import ItemCheckIn from "../components/ItemCheckIn";
import AddNewItem from "../components/AddNewItem";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import editItem from "../components/editItem";
import Users from "../components/Users";
import editUser from "../components/editUser";
import DuplicateItem from "../components/DuplicateItem";
import Reorders from "../components/Reorders";
import MoveList from "../components/moves/MoveList";
import StockList from "../components/stock/StockList";
import Report from "../components/reports/Report";

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: StockList },
    { path: "/editItem", component: editItem, name: "editItem", props: true },
    {
      path: "/duplicateItem",
      component: DuplicateItem,
      name: "duplicateItem",
      props: true
    },
    { path: "/products", component: Products },
    { path: "/productsSellBy", component: ProductsSellBy },
    { path: "/itemCheckIn", component: ItemCheckIn },
    { path: "/addNewItem", component: AddNewItem },
    { path: "/signIn", component: SignIn },
    { path: "/signUp", component: SignUp },
    { path: "/users", component: Users },
    { path: "/reorders", component: Reorders },
    { path: "/editUser", component: editUser, name: "editUser", props: true },
    { path: "/MoveList", component: MoveList },
    { path: "/StockList", component: StockList },
    { path: "/Report", component: Report }
  ]
});
