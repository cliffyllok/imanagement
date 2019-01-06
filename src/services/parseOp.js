import Parse from "parse";

Parse.initialize(
  "H9GTkRqXLAyYb3gnl8Af2ewdnqbYTEKEKqO8spXd",
  "4VQwbh5CtlUPOaXWKxN3KuzrSNefvChZToz91GQJ"
); //PASTE YOUR Back4App APPLICATION ID
Parse.serverURL = "https://parseapi.back4app.com/";

async function update(objToUpdate, updateSource) {
  if (objToUpdate === null) {
    const StockMovements = Parse.Object.extend("StockMovements");
    console.log("create new stockmovement");
    //objToUpdate = Object.create(StockMovements);
    objToUpdate = new StockMovements();
    console.log(objToUpdate);
  }
  console.log("update field " + updateSource["productName"]);
  objToUpdate.set("EventDate", updateSource["eventDate"]);
  objToUpdate.set("ProductName", updateSource["productName"]);
  objToUpdate.set("InOut", updateSource["inOut"]);
  objToUpdate.set("MarketPrice", updateSource["marketPrice"]);
  objToUpdate.set("BuyingPrice", updateSource["buyingPrice"]);
  objToUpdate.set("quantity", updateSource["quantity"]);
  objToUpdate.set("Packaging", updateSource["packaging"]);
  objToUpdate.set("Remarks", updateSource["remarks"]);
  console.log("updateing object");
  console.log(objToUpdate);
  return await objToUpdate.save(null, {
    success: function(obj) {
      console.log("Object updated successfully");
      return obj;
    },
    error: function(response, error) {
      console.log("Error: " + error.message);
      return null;
    }
  });
}
function deleteMove(foundMove) {
  foundMove.destroy({
    success: function(response) {
      console.log("Pet " + foundMove.get("name") + " erased successfully");
    },
    error: function(response, error) {
      console.log("Error: " + error.message);
    }
  });
}
export const StockMovements = Parse.Object.extend("StockMovements");
export const parseOp = {
  getAll: async (objName, colName, matchValue) => {
    let query = new Parse.Query(objName);
    let ret = null;
    if (colName) {
      query.equalTo(colName, matchValue);

      ret = await query.find();
    } else {
      console.log("Find all obj");
      ret = await query.find();
      //   success: function(obj) {
      //     if (obj) {
      //       console.log(
      //         "Obj found successful with name: " +
      //           obj.get("ProductName") +
      //           " and quantity: " +
      //           obj.get("quantity")
      //       );
      //     } else {
      //       console.log("Nothing found, please try again");
      //     }
      //     return obj;
      //   },
      //   error: function(error) {
      //     console.log("Error: " + error.code + " " + error.message);
      //     return null;
      //   }
      // });
    }
    console.log("returned obj");
    console.log(ret);

    return ret;
  },
  deleteRow: async (objName, objToDelete) => {
    let query = new Parse.Query(objName);
    console.log(query);
    console.log("delete row - parseOp" + objName);
    console.log(objToDelete["objectId"]);
    query.equalTo("objectId", objToDelete["objectId"]);

    query
      .find()
      .then(results => {
        console.log("found object to be deleted");
        console.log(objToDelete);
        if (results && results[0]) {
          results[0].destroy({
            success: function(response) {
              console.log(
                "Move " + results[0].get("objectId") + " erased successfully"
              );
            },
            error: function(response, error) {
              console.log("Error: " + error.message);
            }
          });
        } else {
          console.log("error in finding move");
        }
      })
      .catch(error => {
        console.log("error");
        console.log("Error: " + error.code + " " + error.message);
      });
  },
  getAllCurrentMove: async () => {
    let objName = "StockMovements";
    let ret = null;

    let lockQuery = new Parse.Query(objName);
    lockQuery.equalTo("isLocked", false);
    let processQuery = new Parse.Query(objName);
    processQuery.equalTo("hasProcessed", false);

    let validQuery = Parse.Query.and(lockQuery, processQuery);
    validQuery.include("source");
    validQuery.include("destination");
    ret = await validQuery.find();
    console.log("getting valid and current stockmovements");
    return ret;
  },
  getAllUpdatedStock: async () => {
    let objName = "Stock";
    let ret = null;

    let isCurQuery = new Parse.Query(objName);
    isCurQuery.equalTo("isCurrent", true);

    ret = await isCurQuery.find();
    console.log("getting valid and current stockmovements");
    return ret;
  },
  getAllStoreLocations: async () => {
    let objName = "StoragePoint";
    let ret = null;

    let isCurQuery = new Parse.Query(objName);

    ret = await isCurQuery.find();
    console.log("get all storagepoint");
    console.log(JSON.stringify(ret));
    return ret;
  },
  getAllVisibleStock: async () => {
    let objName = "Stock";
    let ret = null;

    let isCurQuery = new Parse.Query(objName);
    isCurQuery.equalTo("isCurrent", true);
    let isVisibleQuery = new Parse.Query(objName);
    isVisibleQuery.equalTo("isVisible", true);

    let validQuery = Parse.Query.and(isCurQuery, isVisibleQuery);
    ret = await validQuery.find();
    console.log("getting valid and current stock");
    return ret;
  },
  updateRow: async (objName, updatedObj) => {
    let query = new Parse.Query(objName);
    console.log(query);
    console.log("update row - parseOp" + objName);
    console.log(updatedObj["objectId"]);
    query.equalTo("objectId", updatedObj["objectId"]);
    // query
    //   .find()
    //   .then(results => {
    //     console.log("Done");
    //     console.log(results[0]);
    //     return results[0];
    //   })
    //   .catch(err => {
    //     console.log("Error occur");
    //     console.log(err);
    //   });
    return await query
      .find()
      .then(async results => {
        let ret = null;
        console.log("found object to be updated");
        console.log(updatedObj);
        if (results && results[0]) {
          console.log("getting inot update function");
          ret = await update(results[0], updatedObj);
        } else {
          console.log("Nothing found, please try again");
          ret = await update(null, updatedObj);
        }
        console.log("return from parse update function");
        console.log(ret);
        return ret;
      })
      .catch(error => {
        console.log("error");
        console.log("Error: " + error.code + " " + error.message);
        return null;
      });
  },
  cloneObject: obj => {
    var clone = {};
    for (var i in obj) {
      if (obj[i] != null && typeof obj[i] === "object")
        clone[i] = this.cloneObject(obj[i]);
      else clone[i] = obj[i];
    }
    return clone;
  },
  addRow: async (objName, value) => {
    // let obj = Parse.Object.extend(objName);
    // let newobj = Object.create(obj.prototype);

    let newobj = this.cloneObject(value);
    console.log(newobj);
    newobj.save(null, {
      success: function(pet) {
        console.log("object saved");
        console.log(newobj);
      },
      error: function(response, error) {
        console.log("Error: " + error.message);
      }
    });
  }
};
