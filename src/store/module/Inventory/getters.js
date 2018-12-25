import isWithinRange from "date-fns/is_within_range";
import { addDays, addMonths } from "date-fns";

export const products = state => {
  console.log("getter products");
  let arrProducts = state.products.filter(el => {
    return el.reorderDate === "";
  });
  return arrProducts;
};

export const reorderedItems = state => {
  console.log("getter reordered");
  let arrReorders = state.products.filter(el => {
    return el.onReorderList === true;
  });
  return arrReorders;
};

export const loadedProduct = state => {
  console.log("getter loaded product");
  return state.loadedProduct;
};

export const addItem = state => {
  console.log("getters additem");
  return state.addItem;
};
