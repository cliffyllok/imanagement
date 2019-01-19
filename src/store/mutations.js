export const mutations = {
  ADD_STOCK_MOVEMENT: (state, item) => {
    console.log("mutate add stockMovements");
    console.log(JSON.stringify(state));
    console.log(JSON.stringify(item));

    if (state && state.stockMovements) {
      state.stockMovements.push(item);
    }
  },
  UPDATE_STOCK_MOVEMENT: (state, items) => {
    console.log("mutate stockMovements");
    console.log(JSON.stringify(state));
    console.log(JSON.stringify(items));
    state.stockMovements = items;
  },
  UPDATE_ALL_MOVES: (state, items) => {
    console.log("mutate allMoves");
    state.allMoves = items;
  },
  UPDATE_STORE_LOCATION: (state, items) => {
    console.log("mutate update store Location");
    state.storeLoca = items;
  },
  UPDATE_SINGLE_STOCK_MOVEMENT: (state, item) => {
    console.log("mutate single stockMovements");
    let index = 0;
    let found = false;
    console.log(state.stockMovements);
    console.log(item);
    state.stockMovements.forEach((element, index) => {
      if (element.objectId === item.objectId) {
        state.stockMovements[index] = item;
        found = true;
      }
      index++;
    });
    if (!found) {
      console.log("Creating a new item");
      state.stockMovements.push(item);
    }
    //state.stockMovements[state.stockMovements.indexOf(item)] = item;
  },
  DELETE_STOCK_MOVEMENT: (state, item) => {
    console.log("mutate delete stockMovements");
    console.log(JSON.stringify(state));
    console.log(JSON.stringify(item));
    state.stockMovements.splice(state.stockMovements.indexOf(item), 1);
  },

  UPDATE_STOCK: (state, items) => {
    console.log("mutate stockMovements");
    console.log(JSON.stringify(state));
    console.log(JSON.stringify(items));
    state.stockList = items;
  }
};

export const loadProducts = (state, items) => {
  state.products = items;
};

export const setUser = (state, currUser) => {
  state.user = currUser;
};

export const loadUsers = (state, users) => {
  state.loadedUsers = users;
};

export const clearAll = state => {
  state.loading = false;
  state.message = "";
  state.messageSuccess = "";
  state.fbError = "";
  state.scancodeFound = false;
  state.hideNav = false;
  state.showMonth = false;
  state.user = null;
  state.addItem = false;
  state.loadedUsers = [];
  state.products = [];
  state.loadedProduct = null;
  state.loc = "";
};

export const setError = (state, err) => {
  state.fbError = err;
};

export const setAddItem = (state, status) => {
  state.addItem = status;
};

export const setLoadedScancode = (state, scancode) => {
  state.loadedScancode = scancode;
};

export const clearLoadedScancode = (state, scancode) => {
  state.loadedScancode = "";
};

export const setReorderList = (state, arrReorderList) => {
  state.reorderList = arrReorderList;
};

export const clearError = state => {
  state.fbError = "";
};

export const setLoading = (state, status) => {
  state.loading = status;
};

export const makePrintable = state => {
  state.hideNav = true;
};

export const showNavbar = state => {
  state.hideNav = false;
};

export const loadProduct = (state, item) => {
  state.loadedProduct = item;
};

export const updateLoadedProduct = (state, val) => {
  state.loadedProduct.SellbyDate = val;
};

export const clearLoadedProduct = state => {
  state.loadedProduct = null;
};

export const setScancodeStatus = (state, status) => {
  state.scancodeFound = status;
};

export const setMessage = (state, msg) => {
  state.message = msg;
};

export const clearMessage = (state, msg) => {
  state.message = "";
};

export const setMessageSuccess = (state, msgSuccess) => {
  state.messageSuccess = msgSuccess;
  setTimeout(() => {
    state.messageSuccess = "";
  }, 4000);
};

export const setLoc = (state, dest) => {
  state.loc = dest;
};

export const changeView = state => {
  state.showMonth = !state.showMonth;
};
