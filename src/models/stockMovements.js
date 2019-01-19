export class StockMove {
  objectId = null;
  moveId = new Date().getTime();
  eventDate = new Date();
  productName = "";
  inOut = true;
  marketPrice = 0;
  buyingPrice = 0;
  quantity = 0;
  packing = "";
  remarks = "";
  hasProcessed = false;
  isLocked = false;

  construct(data) {
    console.log("creating new stockMove");
    this.objectId = !data || !data.objectId ? null : data.objectId;
    if (!data || !data.moveId) {
      this.moveId = new Date().getTime();
    } else {
      this.moveId = data.moveId;
    }
    if (!data || !data.EventDate) {
      this.eventDate = new Date();
    } else {
      this.eventDate = data.EventDate;
    }

    if (!data || !data.ProductName) {
      this.productName = "UNKNOWN";
    } else {
      this.productName = data.ProductName;
    }
    if (!data || !data.InOut) {
      this.inOut = true;
    } else {
      this.inOut = data.InOut;
    }
    if (!data || !data.MarketPrice) {
      this.marketPrice = 0;
    } else {
      this.marketPrice = data.MarketPrice;
    }
    if (!data || !data.BuyingPrice) {
      this.buyingPrice = 0;
    } else {
      this.buyingPrice = data.BuyingPrice;
    }
    if (!data || !data.quantity) {
      this.quantity = 0;
    } else {
      this.quantity = data.quantity;
    }
    this.packing = !data || !data.Packing ? null : data.Packing;
    this.remarks = !data || !data.Remarks ? "" : data.Remarks;
    this.hasProcessed = false;
    this.isLocked = false;
  }

  // and so on, put other methods here
}
// export const STOCKMOVEMENTS = {
//   ObjectId: "id",
//   ObjectKey: "itemkey",
//   EventDate: "EventDate",
//   ProductName: "ProductName",
//   InOut: "InOut",
//   MarketPrice: "MarketPrice",
//   BuyingPrice: "BuyingPrice",
//   Quantity: "quantity",
//   Packing: "Packaging",
//   Remarks: "Remarks"
// };
