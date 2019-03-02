import isWithinRange from "date-fns/is_within_range";

export const getters = {
  movesByDate: state => {
    console.log("get move by date");
    //return a function pointer so the calller can pass parameters

    return (startDate, endDate) => {
      if (!startDate) {
        startDate = new Date(-8640000000000000);
      }
      if (!endDate) {
        endDate = new Date(8640000000000000);
      }
      let parts = startDate.split("-");
      startDate = new Date(parts[0], parts[1] - 1, parts[2]);
      parts = endDate.split("-");
      endDate = new Date(parts[0], parts[1] - 1, parts[2]);
      return state.allMoves.filter(el => {
        return isWithinRange(el.eventDate, startDate, endDate);
      });
    };
  }
};

/* for movement event of stock */
export const stockMovements = state => {
  console.log("getter stockMove");
  let arrMoves = state.stockMovements.filter(el => {
    return el.productName === "";
  });
  return arrMoves;
};
/* END for movement event of stock */

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
