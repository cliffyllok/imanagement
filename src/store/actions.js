import * as firebase from "firebase";

import { parseOp } from "../services/parseOp";
import router from "../router/index";
import { StockMove } from "../models/stockMovements";
import { STOCKMOVEMENTS } from "../models/stockMovementColMapping";
import { STOCK } from "../models/stockColMapping";
import { STORELOCA } from "../models/storeLocationColMapping";

/* utility functions for actions */
function moveObjToModel(moves) {
  const items = [];
  let objectId = "";
  let moveId = "";
  let eventDate = new Date();
  let productName = "";
  let inOut = false;
  let marketPrice = 0;
  let buyingPrice = 0;
  let packing = "";
  let remarks = "";
  let quantity = 0;
  let source = null;
  let destination = null;
  // standardize each item with elements of the legacy db

  Object.keys(moves).forEach(key => {
    moves[key].id === undefined
      ? (objectId = null)
      : (objectId = moves[key].id);

    moves[key].moveId === undefined
      ? (moveId = null)
      : (moveId = moves[key].moveId);

    moves[key].get(StockMove.EventDate) === undefined
      ? (eventDate = new Date())
      : (eventDate = moves[key].get(STOCKMOVEMENTS.EventDate));

    moves[key].get(STOCKMOVEMENTS.ProductName) === undefined
      ? (productName = "")
      : (productName = moves[key].get(STOCKMOVEMENTS.ProductName));
    moves[key].get(STOCKMOVEMENTS.InOut) === undefined
      ? (inOut = true)
      : (inOut = moves[key].get(STOCKMOVEMENTS.InOut));

    // fill all blank sellBy dates for date sorting...these will still show as blank on products pages
    moves[key].get(STOCKMOVEMENTS.MarketPrice) === undefined
      ? (marketPrice = 0)
      : (marketPrice = moves[key].get(STOCKMOVEMENTS.MarketPrice));

    moves[key].get(STOCKMOVEMENTS.BuyingPrice) === undefined
      ? (buyingPrice = 0)
      : (buyingPrice = moves[key].get(STOCKMOVEMENTS.BuyingPrice));
    moves[key].get(STOCKMOVEMENTS.Packing) === undefined
      ? (packing = "")
      : (packing = moves[key].get(STOCKMOVEMENTS.Packing));
    moves[key].get(STOCKMOVEMENTS.Remarks) === undefined
      ? (remarks = "")
      : (remarks = moves[key].get(STOCKMOVEMENTS.Remarks));
    moves[key].get(STOCKMOVEMENTS.Quantity) === undefined
      ? (quantity = 0)
      : (quantity = moves[key].get(STOCKMOVEMENTS.Quantity));

    moves[key].get(STOCKMOVEMENTS.source) === undefined
      ? (source = null)
      : (source = moves[key].get(STOCKMOVEMENTS.source).toJSON());
    moves[key].get(STOCKMOVEMENTS.destination) === undefined
      ? (destination = null)
      : (destination = moves[key].get(STOCKMOVEMENTS.destination).toJSON());

    //console.log(JSON.stringify(destination.get("storageType")));
    items.push({
      objectId: objectId,
      moveId: moveId,
      productName: productName,
      eventDate: eventDate,
      inOut: inOut,
      packing: packing,
      marketPrice: marketPrice,
      buyingPrice: buyingPrice,
      remarks: remarks,
      quantity: quantity,
      source: source,
      destination: destination
    });
  });
  return items;
}
function storeLocationToModel(storeLoca) {
  const items = [];
  let objectId = "";
  let sectionCode = "";
  let sectionName = "";
  let location = "";
  let name = "";
  let locationCode = "";
  let sectionId = 0;
  let storageType = "";
  // standardize each item with elements of the legacy db

  Object.keys(storeLoca).forEach(key => {
    storeLoca[key].id === undefined
      ? (objectId = "")
      : (objectId = storeLoca[key].id);

    storeLoca[key].get(STORELOCA.sectionId) === undefined
      ? (sectionId = "")
      : (sectionId = storeLoca[key].get(STORELOCA.sectionId));

    storeLoca[key].get(STORELOCA.sectionCode) === undefined
      ? (sectionCode = new Date())
      : (sectionCode = storeLoca[key].get(STORELOCA.sectionCode));

    storeLoca[key].get(STORELOCA.sectionName) === undefined
      ? (sectionName = "")
      : (sectionName = storeLoca[key].get(STORELOCA.sectionName));
    storeLoca[key].get(STORELOCA.location) === undefined
      ? (location = "")
      : (location = storeLoca[key].get(STORELOCA.location));

    storeLoca[key].get(STORELOCA.name) === undefined
      ? (name = "")
      : (name = storeLoca[key].get(STORELOCA.name));

    storeLoca[key].get(STORELOCA.locationCode) === undefined
      ? (locationCode = 0)
      : (locationCode = storeLoca[key].get(STORELOCA.locationCode));

    storeLoca[key].get(STORELOCA.storageType)
      ? (storageType = storeLoca[key].get(STORELOCA.storageType))
      : (storageType = "");

    items.push({
      objectId: objectId,
      sectionId: sectionId,
      sectionName: sectionName,
      sectionCode: sectionCode,
      location: location,
      locationCode: locationCode,
      name: name,
      storageType: storageType
    });
  });
  return items;
}
function stockObjToModel(stock) {
  const items = [];
  let objectId = "";
  let stockId = "";
  let asOfDate = new Date();
  let product = "";
  let marketPrice = 0;
  let averageBuyingPrice = 0;
  let packing = "";
  let quantity = 0;
  let storeLocation = "";
  let section = "";
  let buyingPrice = 0;
  let totalValue = 0;
  // standardize each item with elements of the legacy db

  Object.keys(stock).forEach(key => {
    stock[key].id === undefined
      ? (objectId = null)
      : (objectId = stock[key].id);

    stock[key].stockId === undefined
      ? (stockId = null)
      : (stockId = stock[key].stockId);

    stock[key].get(STOCK.product) === undefined
      ? (product = "")
      : (product = stock[key].get(STOCK.product));

    stock[key].get(STOCK.asOfDate) === undefined
      ? (asOfDate = new Date())
      : (asOfDate = stock[key].get(STOCK.asOfDate));

    // fill all blank sellBy dates for date sorting...these will still show as blank on products pages
    stock[key].get(STOCK.marketPrice) === undefined
      ? (marketPrice = 0)
      : (marketPrice = stock[key].get(STOCK.marketPrice));

    stock[key].get(STOCK.averageBuyingPrice) === undefined
      ? (averageBuyingPrice = 0)
      : (averageBuyingPrice = stock[key].get(STOCK.averageBuyingPrice));
    stock[key].get(STOCK.packing) === undefined
      ? (packing = "")
      : (packing = stock[key].get(STOCK.packing));
    stock[key].get(STOCK.quantity) === undefined
      ? (quantity = 0)
      : (quantity = stock[key].get(STOCK.quantity));
    stock[key].get(STOCK.storeLocation) === undefined
      ? (storeLocation = "")
      : (storeLocation = stock[key].get(STOCK.storeLocation));
    stock[key].get(STOCK.section) === undefined
      ? (section = 0)
      : (section = stock[key].get(STOCK.section));

    stock[key].get(STOCK.totalValue)
      ? (totalValue = stock[key].get(STOCK.totalValue))
      : (totalValue = 0);

    stock[key].get(STOCK.buyingPrice)
      ? (buyingPrice = stock[key].get(STOCK.buyingPrice))
      : (buyingPrice = 0);

    items.push({
      objectId: objectId,
      stockId: stockId,
      product: product,
      asOfDate: asOfDate,
      packing: packing,
      marketPrice: marketPrice,
      averageBuyingPrice: averageBuyingPrice,
      totalValue: totalValue,
      quantity: quantity,
      storeLocation: storeLocation,
      section: section,
      buyingPrice: buyingPrice
    });
    console.log("items");
  });
  return items;
}
async function getAllCurrentStock() {
  let stock = await parseOp.getAllUpdatedStock();
  console.log("get all stock");
  let items = stockObjToModel(stock);
  return items;
}
async function getAllStoreLocations() {
  let storeLoca = await parseOp.getAllStoreLocations();

  let items = storeLocationToModel(storeLoca);
  console.log("returned storeloca");
  return items;
}
async function getAllCurrentMove() {
  console.log("action load all stock move");

  let moves = await parseOp.getAllCurrentMove();
  console.log("all stock move returned");
  console.log(moves);

  let items = moveObjToModel(moves);
  return items;
}
async function getAllMoves() {
  console.log("action load all moves");

  let moves = await parseOp.getAllMoves();
  console.log("all move returned");
  console.log(moves);

  let items = moveObjToModel(moves);
  return items;
}
function processMove(base, move, natureOfMove) {
  let targetProduct = base.find(obj => {
    return obj.product === move.productName && obj.packing === move.packing;
  });
  if (targetProduct) {
    let totalQuantity = targetProduct.quantity + move.quantity * natureOfMove;
    let agTotalPrice =
      targetProduct.marketPrice * targetProduct.quantity +
      move.marketPrice * move.quantity * natureOfMove;
    let agAvgMarketPrice = agTotalPrice / totalQuantity;

    let agTotalBuyingPrice =
      targetProduct.buyingPrice * targetProduct.quantity +
      move.buyingPrice * move.quantity * natureOfMove;
    let agAvgBuyingPrice = agTotalBuyingPrice / totalQuantity;

    targetProduct.quantity = totalQuantity;
    targetProduct.marketPrice = agAvgMarketPrice;
    targetProduct.buyingPrice = agAvgBuyingPrice;

    let totalValue = targetProduct.quantity * targetProduct.marketPrice;
    let totalCost = targetProduct.quantity * targetProduct.buyingPrice;
    targetProduct.totalCost = totalCost;
    targetProduct.totalValue = totalValue;
    targetProduct.margin = (totalValue - totalCost) / targetProduct.quantity;
  } else {
    //Add new move to aggretation
    console.log("moves added");

    let totalValue = move.quantity * move.marketPrice;
    let totalCost = move.quantity * move.buyingPrice;
    /* Create new agMove item */
    let newAgMove = {
      product: move.productName,
      packing: move.packing,
      quantity: move.quantity * natureOfMove,
      marketPrice: move.marketPrice,
      buyingPrice: move.buyingPrice,
      totalValue: totalValue,
      totalCost: totalCost,
      margin:
        move.quantity * natureOfMove !== 0
          ? ((totalValue - totalCost) / move.quantity) * natureOfMove
          : 0
    };
    console.log("moves buying price:" + move.buyingPrice);
    base.push(newAgMove);
  }
  console.log(base[0].buyingPrice);
  console.log(base);
  return base;
}
/* Calculate the most up-to-date stock based on unprocessed movements and latest snapshot
 * param: move, a move object in the following form
 *              {
 *               objectId: '',
 *               source: Object,
 *               destination: Object,
 *
 *               }
 * return: 0 for moves that do not add any additional stock
 *         1 for moves that add additional stock form external source (marked in StoragePoint class as SRCE)
 *         -1 for moves that reduces stock by selling or dumping to external destinations
 */
function isMoveAddOrMinus(move) {
  //move.source is a ParseObject, so need to use .get() here
  // move.source.fetch().then(obj => {
  //   console.log("fetch source");
  //   console.log(obj.storeType);
  // });
  if (move) {
    if (
      move.source.storageType === "SRCE" &&
      move.destination.storageType === "STCK"
    ) {
      return 1;
    }
    if (
      move.source.storageType === "STCK" &&
      move.destination.storageType === "DEST"
    ) {
      return -1;
    }
    return 0;
  }
}

function convertSnapshotToMove(snapshot, product, packing) {
  let snapshotProduct = {
    objectId: null,
    moveId: null,
    productName: "",
    eventDate: null,
    inOut: true,
    packing: null,
    marketPrice: 0,
    buyingPrice: 0,
    remarks: null,
    quantity: 0,
    source: "SRCE",
    destination: "STCK"
  };

  if (snapshot) {
    snapshotProduct.productName = snapshot.product;
    snapshotProduct.packing = snapshot.packing;
    snapshotProduct.marketPrice = snapshot.marketPrice;
    snapshotProduct.buyingPrice = snapshot.buyingPrice;
    snapshotProduct.quantity = snapshot.quantity;
  }
  return snapshotProduct;
}
//Assume all moves are of different product type
//output an array of move object
function aggregateMoves(moves) {
  let agMovesByProduct = [];
  let product = null;
  let packing = null;
  Object.keys(moves).forEach(key => {
    console.log("aggregatMove");
    let natureOfMove = isMoveAddOrMinus(moves[key]);
    agMovesByProduct = processMove(agMovesByProduct, moves[key], natureOfMove);
  });
  return agMovesByProduct;
}
function calMostUpdatedStock(snapshot, moves) {
  console.log("calMostUpdatedStock");
  let agMoves = aggregateMoves(moves);
  let newSnapshot = null;
  console.log("aggregate move returned");
  Object.keys(snapshot).forEach(key => {
    console.log("loop snapshot for product");

    //since all snapshot product will be adding to stock
    let natureOfMove = 1;
    //since processMove only accept move object, has to convert first
    newSnapshot = processMove(
      agMoves,
      convertSnapshotToMove(snapshot[key]),
      natureOfMove
    );
  });
  console.log("after calStock");
  return newSnapshot;
}
/* End of utility functions for actions */

/* all functions in action */
export const actions = {
  ///////Start StockMovements ///////////
  ADD_STOCKMOVES: async ({ commit, state }) => {
    console.log("Add moves");
    let newMove = new StockMove();

    console.log("new move created");
    //calling mutations
    commit("ADD_STOCK_MOVEMENT", newMove);
    return newMove;
  },
  UPDATE_STOCKMOVES: async ({ commit, state }, value) => {
    console.log("Update moves");
    let updatedItem = await parseOp.updateRow("StockMovements", value);
    console.log("update moves return from parseOp");
    console.log(updatedItem);
    value.objectId = updatedItem.id;

    await commit("UPDATE_SINGLE_STOCK_MOVEMENT", value);
  },
  DELETE_STOCKMOVES: async ({ commit, state }, value) => {
    console.log("Delete move");
    parseOp.deleteRow("StockMovements", value);

    await commit("DELETE_STOCK_MOVEMENT", value);
  },
  LOAD_ALL_STORE_LOCATION: async ({ commit, state }) => {
    console.log("load store locations");

    const items = await getAllStoreLocations();
    await commit("UPDATE_STORE_LOCATION", items);
  },

  LOAD_ALL_CURSTOCKMOVES: async ({ commit, state }) => {
    console.log("action load all current movements");

    // let moves = await parseOp.getAll("StockMovements");
    // console.log("get all returning");

    const items = await getAllCurrentMove();
    console.log("items");

    await commit("UPDATE_STOCK_MOVEMENT", items);
    // if (state.loc !== "/") {
    //   router.push(state.loc);
    // }
  },
  LOAD_ALL_STOCKMOVES: async ({ commit, state }) => {
    console.log("action load all movements");

    // let moves = await parseOp.getAll("StockMovements");
    // console.log("get all returning");

    const items = await getAllMoves();
    console.log("items");

    await commit("UPDATE_ALL_MOVES", items);
    // if (state.loc !== "/") {
    //   router.push(state.loc);
    // }
  },
  ///////End StockMovements ///////////
  ///////Start StockList ///////////
  LOAD_ALL_STOCK: async ({ commit, state }) => {
    let unprocessedMoves = await getAllCurrentMove();
    console.log("Load all stock");
    console.log(unprocessedMoves);
    let lastStockSnapshot = await getAllCurrentStock();
    console.log("latest stock snapshot returned");
    console.log(lastStockSnapshot);
    let mostUpdatedStock = calMostUpdatedStock(
      lastStockSnapshot,
      unprocessedMoves
    );
    console.log("calculated stock returned");
    console.log(mostUpdatedStock);

    await commit("UPDATE_STOCK", mostUpdatedStock);
    // if (state.loc !== "/") {
    //   router.push(state.loc);
    // }
  }
};

/*************** End of  all functions in action *************/

export const signIn = ({ commit, dispatch }, user) => {
  console.log("action: signIn");
  commit("setLoading", true);
  Parse.User.logIn(user.email, user.password)
    .then(user => {
      commit("clearError");

      console.log(
        "User logged in successful with username: " +
          user.get("username") +
          " and email: " +
          user.get("email")
      );
      dispatch("getUserInfo", user.uid);
    })
    .catch(error => {
      console.log("login error");
      commit("setLoading", false);
      commit("setError", error.message);
    });
};

export const getUserInfo = ({ commit, dispatch }, userId) => {
  console.log("get user info");
  firebase
    .database()
    .ref("users")
    .child(userId)
    .once("value")
    .then(data => {
      const objUser = data.val();
      commit("setUser", objUser);
      if (objUser.authLevel === "1") {
        dispatch("loadUsers");
      }
      dispatch("loadProducts");
    });
};

export const loadUsers = ({ commit }) => {
  console.log("load user from db");
  firebase
    .database()
    .ref("users")
    .once("value")
    .then(data => {
      const users = [];
      const obj = data.val();
      for (let key in obj) {
        users.push({
          userId: obj[key].userId,
          name: obj[key].name,
          email: obj[key].email,
          authLevel: obj[key].authLevel
        });
      }
      commit("loadUsers", users);
    })
    .catch(error => {
      commit("setError", error.message);
      commit("setLoading", false);
    });
};

export const loadProducts = ({ commit, state }) => {
  console.log("load products");
  firebase
    .database()
    .ref("products")
    .once("value")
    .then(data => {
      const objProducts = data.val();
      const items = [];
      let reorderDate = "";
      let lastEditDate = "";
      let sbd = "";
      let tempSellByDate = "";
      let creatorId = "";
      let editedBy = "";
      let onReorderList = "";

      if (state.user.authLevel === "1") {
        // 10 years in the future, created for sorting purposes
        tempSellByDate = state.defaultSellByDate;
      } else {
        tempSellByDate = "";
      }

      // standardize each item with elements of the legacy db

      Object.keys(objProducts).forEach(key => {
        objProducts[key].reorderDate === undefined
          ? (reorderDate = "")
          : (reorderDate = objProducts[key].reorderDate);
        objProducts[key].onReorderList === undefined
          ? (onReorderList = false)
          : (onReorderList = objProducts[key].onReorderList);
        objProducts[key].lastEditDate === undefined
          ? (lastEditDate = "")
          : (lastEditDate = objProducts[key].lastEditDate);

        // fill all blank sellBy dates for date sorting...these will still show as blank on products pages
        objProducts[key].SellbyDate === ""
          ? (sbd = tempSellByDate)
          : (sbd = objProducts[key].SellbyDate);

        objProducts[key].creatorId === undefined
          ? (creatorId = "")
          : (creatorId = objProducts[key].creatorId);
        objProducts[key].editedBy === undefined
          ? (editedBy = "")
          : (editedBy = objProducts[key].editedBy);

        items.push({
          id: key,
          brandName: objProducts[key].Brand,
          receiptAlias: objProducts[key].ReceiptAlias,
          scancode: objProducts[key].Scancode,
          SellbyDate: sbd,
          creatorId: creatorId,
          editedBy: editedBy,
          lastEditDate: lastEditDate,
          reorderDate: reorderDate,
          onReorderList: onReorderList
        });
      });

      commit("loadProducts", items);
      commit("setLoading", false);
      if (state.loc !== "/addNewItem") {
        router.push(state.loc);
      }
    })
    .catch(error => {
      commit("setError", error.message);
      commit("setLoading", false);
    });
};

export const signUp = ({ commit, dispatch }, newUser) => {
  console.log("action: signup");
  commit("setLoading", true);
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(user => {
      commit("setLoading", false);
      commit("clearError");
      const currUser = {
        userId: user.uid,
        name: newUser.name,
        email: user.email,
        authLevel: "3"
      };
      dispatch("addNewUser", currUser);
    })
    .catch(error => {
      commit("setError", error.message);
      commit("setLoading", false);
    });
};

export const addNewUser = ({ commit, dispatch }, currUser) => {
  console.log("action: addnewuser");
  firebase
    .database()
    .ref("users")
    .child(currUser.userId)
    .update(currUser)
    .then(data => {
      commit("clearAll");
      dispatch("getUserInfo", currUser.userId);
    })
    .catch(error => {
      commit("setError", error.message);
      commit("setLoading", false);
    });
};

export const editUser = ({ commit }, user) => {
  console.log("action: edit user");
  firebase
    .database()
    .ref("users")
    .child(user.userId)
    .update(user)
    .catch(error => {
      commit("setError", error.message);
      console.log(error);
    });
  router.replace("/users");
};

export const addNewItem = ({ commit, dispatch }, newItem) => {
  firebase
    .database()
    .ref("products")
    .push(newItem)
    .then(data => {
      dispatch("loadProducts");
      commit("setScancodeStatus", false);
      commit("clearMessage");
      commit("setMessageSuccess", "Item sucessfully added!");
    })
    .catch(error => {
      commit("setError", error.message);
    });
};

export const editItem = ({ commit, dispatch }, item) => {
  console.log("action: edit item");
  firebase
    .database()
    .ref("products")
    .child(item.id)
    .update(item)
    .catch(error => {
      commit("setError", error.message);
      console.log(error);
    });
  dispatch("loadProducts");
};

export const reorderItem = ({ commit, dispatch }, reorderedItem) => {
  console.log("action: reorder Item");
  firebase
    .database()
    .ref("products")
    .child(reorderedItem.id)
    .update(reorderedItem)
    .catch(error => {
      commit("setError", error.message);
      console.log(error);
    });
  dispatch("loadProducts");
};

export const setLoadedScancode = ({ commit, state }, objItem) => {
  console.log("action: setLoadedScancode");
  if (objItem.scancodeFound) {
    commit("setMessage", "Item found. Enter new Sell By date.");
    let product = state.products.find(el => el.scancode === objItem.sc);
    commit("setScancodeStatus", true);
    commit("loadProduct", product);
  } else {
    commit("setMessage", "Product not found. Add item.");
    commit("setAddItem", true);
    commit("setLoadedScancode", objItem.sc);
  }
};

export const addOrder = ({ commit, state, dispatch }, objItem) => {
  console.log("action: addOrder");
  if (objItem.scancodeFound) {
    let product = state.products.find(el => el.scancode === objItem.sc);
    let objItemRestock = { itemId: product.id, action: "add" };
    dispatch("setRestockStatus", objItemRestock);
    router.push("/reorders");
    commit("setMessageSuccess", "Item added to list.");
  } else {
    commit("setMessage", "Product not found!");
    setTimeout(() => {
      commit("clearMessage");
    }, 3500);
  }
};

export const setRestockStatus = ({ commit, dispatch }, objItemRestock) => {
  console.log("action: setRestockStatus");
  commit("setLoading", true);
  let entryRef = firebase
    .database()
    .ref("products")
    .child(objItemRestock.itemId);
  let restockStatus = true;
  objItemRestock.action === "remove" ? (restockStatus = false) : "";
  return entryRef
    .update({ onReorderList: restockStatus })
    .then(() => {
      console.log("Document successfully updated!");
      dispatch("loadProducts");
    })
    .catch(error => {
      console.error("Error updating document: ", error);
    });
};

export const clearRestockList = ({ commit, dispatch, getters }) => {
  console.log("action: clearREstocklist");
  commit("setLoading", true);
  getters.reorderedItems.forEach(el => {
    let itemId = el.id;
    let entryRef = firebase
      .database()
      .ref("products")
      .child(itemId);
    return entryRef.update({
      onReorderList: false
    });
  });
  dispatch("loadProducts");
};
