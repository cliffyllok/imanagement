<script>
//import Datepicker from "vuejs-datepicker";
import vselect from "vue-select";
import { VueGoodTable } from "vue-good-table";
import Datepicker from "../shared/Datepicker";

export default {
  name: "Report",
  components: {
    datepicker: Datepicker,
    "v-select": vselect,
    "vg-table": VueGoodTable
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

      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menuStart: false,
      menuEnd: false,
      modal: false,
      selectedDate: new Date(),
      columns: [
        {
          label: "Product",
          field: "productName",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter This Thing", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [] // dropdown (with selected values) instead of text input
            //filterFn: this.columnFilterFn, //custom filter function that
            //trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: "Packing",
          field: "packing"
        },
        {
          label: "Market Price",
          field: "marketPrice",
          type: "number"
        },
        {
          label: "Buying Price",
          field: "buyingPrice",
          type: "number"
        },
        {
          label: "Profit Margin",
          field: "profit",
          type: "number"
        },
        {
          label: "Quantity",
          field: "qunatity",
          type: "number"
        },
        {
          label: "Total Value",
          field: "totalValue",
          type: "number"
        }
      ]
    };
  },
  computed: {
    rows: {
      get() {
        console.log("getting moves rows");
        console.log(this.$store);
        if (!this.$store.state.allMoves) {
          console.log("moves List is undefined");
          this.initData();
        }
        if (!this.$store.state.allMoves) {
          return [];
        } else {
          return this.$store.getters.movesByDate(this.startDate, this.endDate);
        }
      }
    },
    startDateFormatted: {
      get() {
        return this.formatDate(this.startDate);
      }
    },
    endDateFormatted: {
      get() {
        return this.formatDate(this.endDate);
      }
    }
  },
  props: {},
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
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
    },
    refreshRows: function() {
      console.log(this.rows);
    }
  }
};
</script>
<!-- *************TEMPLATE SESSION****************** -->
<template>
  <div id="Report" class="subjects-content">
    <h3 class="subjects-trimester-title">Transaction report</h3>
    <h4 class="subjects-trimester-title">Transactions</h4>

    <div class="list-op-row">
      <div class="list-op-pane">
        <div class="list-op-range-lable col-sm-3">Period: &nbsp;</div>
        <div class="rangePicker ">
          <div class="startDate-picker col-sm-5">
            <v-flex date-picker xs11 sm5>
              <v-menu
                ref="menu"
                :close-on-content-click="true"
                v-model="menuStart"
                :nudge-right="40"
                :return-value="startDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="startDateFormatted"
                  label="Picker in menu"
                  prepend-icon="event"
                  readonly
                  class="periodRangePickStart"
                ></v-text-field>
                <v-date-picker
                  v-model="startDate"
                  type="date"
                  no-title
                  scrollable
                  @input="menuStart = false;"
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false;"
                    >Cancel</v-btn
                  >
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.menu.save(startDate);"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
          <div class="separator col-sm-2">
            <span class="dateSeparator">-</span>
          </div>
          <div class="endDate-picker col-sm-5">
            <v-flex date-picker xs11 sm5>
              <v-menu
                ref="menu"
                :close-on-content-click="true"
                v-model="menuEnd"
                :nudge-right="40"
                :return-value="endDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="endDateFormatted"
                  label="Picker in menu"
                  prepend-icon="event"
                  readonly
                  class="periodRangePickEnd"
                ></v-text-field>
                <v-date-picker
                  v-model="endDate"
                  type="date"
                  @input="menuEnd = false;"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false;"
                    >Cancel</v-btn
                  >
                  <v-btn flat color="primary" @click="$refs.menu.save(endDate);"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
        </div>
      </div>
    </div>

    <div id="transaction-list" class="stock-move-list">
      <vg-table
        id="TransactionTable"
        class="table table-hover table-striped sortable"
        :columns="columns"
        :rows="rows"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'productName', type: 'asc' }
        }"
      >
      </vg-table>
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
.date-picker {
  min-width: 130px;
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
  display: inline-block;
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
