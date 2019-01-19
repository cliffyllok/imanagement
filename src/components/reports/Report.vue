<script>
import Datepicker from "vuejs-datepicker";
import vselect from "vue-select";

export default {
  name: "StockManager",
  components: {
    datepicker: Datepicker,
    "v-select": vselect
  },
  data() {
    return {
      periodOptions: [
        "SelectDate",
        "Latest month",
        "past 3 months",
        "past 6 months",
        "past year"
      ],
      selectedPeriod: 0,
      selectedDate: new Date()
    };
  },
  computed: {
    rows: {
      get() {
        console.log("getting moves rows");
        if (!this.$store.state.allMoves) {
          console.log("moves List is undefined");
          this.initData();
        }
        return this.$store.state.allMoves;
      }
    }
  },
  props: {},
  methods: {
    initData: async function() {
      console.log("getting stock data");

      let result = await this.$store.dispatch("LOAD_ALL_STOCKMOVES");
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(err => {
      //   console.log("error");
      //   console.log(err);
      // });
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(this.$store.state.allMoves));
    }
  }
};
</script>

<template>
  <div id="Report" class="subjects-content">
    <h3 class="subjects-trimester-title">Transaction report</h3>
    <h4 class="subjects-trimester-title">Transactions</h4>

    <div class="list-op-row">
      <div class="list-op-pane">
        Period: &nbsp;
        <v-select
          class="periodSelect"
          label="name"
          :options="periodOptions"
          v-model="selectedPeriod"
        ></v-select>
        <div class="rangePicker">
          <datepicker
            class="periodRangePickStart"
            :value="selectedDate"
          ></datepicker>
          <span class="dateSeparator">-</span>
          <datepicker
            class="periodRangePickEnd"
            :value="selectedDate"
          ></datepicker>
        </div>
      </div>
    </div>

    <div id="transaction-list" class="stock-move-list">
      <table
        id="TransactionTable"
        class="table table-hover table-striped sortable"
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Packing</th>
            <th>market Price</th>
            <th>Average Buying Price</th>
            <th>Profit Margin</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Store Location</th>
            <th>Store Section</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <td>
              <!-- Product -->
              <span class="table-cell-text">{{ row.productName }}</span>
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
.periodSelect {
  min-width: 200px;
}
.rangePicker {
  float: left;
}
.dateSeparator {
  float: left;
}
.periodRangePickEnd {
  width: 30%;
  float: left;
}
.periodRangePickStart {
  width: 30%;
  float: left;
}

.textboxCT {
  text-align: center;
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
