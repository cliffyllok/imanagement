<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "StockManager",
  components: {
    datepicker: Datepicker
  },
  data() {
    console.log("getting data");
    return {
      saveData: null,
      rownum: 1,
      showModal: false,
      isContinue: false
    };
  },
  computed: {
    rows: {
      get() {
        console.log("getting stock rows");
        if (!this.$store.state.stockList) {
          console.log("stockeList is undefined");
          this.initData();
        }
        return this.$store.state.stockList;
      },
      set(value) {
        this.updateData(value);
      }
    }
  },
  props: {
    myOptions: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getObj: function() {
      console.log(JSON.stringify(this.$store.state.stockList));
      return this.$store.state.stockList;
    },
    updateRow: function(value) {
      this.$store.dispatch("UPDATE_STOCK", value);
    },
    initData: async function() {
      console.log("getting stock data");

      let result = await this.$store.dispatch("LOAD_ALL_STOCK");
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(err => {
      //   console.log("error");
      //   console.log(err);
      // });
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(this.$store.state.stockList));
    },
    updateData: async function(value) {
      console.log("updateData");
      this.$store.state.stockList = value;
      this.rows = this.$store.state.stockList;
    }
  }
};
</script>

<template>
  <div id="StockList" class="subjects-content">
    <h3 class="subjects-trimester-title">{{ $t("appName") }}</h3>
    <h4 class="subjects-trimester-title">{{ $t("stock") }}</h4>

    <div id="stock-move-list" class="stock-move-list">
      <table id="StockTable" class="table table-hover table-striped sortable">
        <thead>
          <tr>
            <th>{{ $t("productName") }}</th>
            <th>{{ $t("packing") }}</th>
            <th>{{ $t("marketPrice") }}</th></th>
            <th>{{ $t("avgBuyingPrice") }}</th>
            <th>{{ $t("profitMargin") }}</th>
            <th>{{ $t("quantity") }}</th>
            <th>{{ $t("totalValue") }}</th>
            <th>{{ $t("storeLocation") }}</th>
            <th>{{ $t("storeSection") }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <td>
              <!-- Product -->
              <span class="table-cell-text">{{ row.product }}</span>
            </td>
            <td>
              <!-- Packing -->
              <span class="table-cell-text">{{ row.packing }} </span>
            </td>
            <td>
              <!-- Market Price -->
              <span class="table-cell-text">{{ row.marketPrice }} </span>
            </td>
            <td>
              <!-- Buying Price -->
              <span class="table-cell-text">{{ row.buyingPrice }}</span>
            </td>
            <td>
              <!-- Profit Margin -->
              <span class="table-cell-text">{{ row.margin }}</span>
            </td>
            <td>
              <!-- Quantity -->
              <span class="table-cell-text">{{ row.quantity }}</span>
            </td>
            <td>
              <span class="table-cell-text">{{ row.totalValue }} </span>
            </td>

            <td>
              <span class="table-cell-text">{{ row.storeLocation }}</span>
            </td>
            <!-- Store Section -->
            <td>
              <span class="table-cell-text">{{ row.storeSection }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.textboxCT {
  text-align: center;
}
th {
  color: white;
}
thead tr:first-child {
  background-color: #256d7b;
}
tbody tr:nth-child(even) {
  background-color: white;
}
tbody tr:nth-child(odd) {
  background-color: #b8ccd1;
}
.btn {
  padding: 8px;
}
div.btn-in-table {
  display: contents;
  float: left;
  width: 30%;
}
div.btn-pane {
  width: 60px;
}
i.icons-in-table {
  font-size: 22px;
}
.btn-create {
  color: orange;
}
i.icons-update {
  color: green;
}
i.icons-delete {
  color: #990000;
}
.list-op-pane {
  float: right;
}
.list-op-row {
  display: block;
  width: 100%;
}
div#stock-move-list {
  width: 100%;
  display: inline-block;
  overflow: auto;
}
</style>
