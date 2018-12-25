<template>
  <div id="MoveList" class="subjects-content">
    <h3 class="subjects-trimester-title">Inventory Management System</h3>
    <h4 class="subjects-trimester-title">Movements</h4>
    <div class="list-op-row">
      <div class="list-op-pane">
        Number of Rows: &nbsp;
        <input
          v-model.number="rownum"
          type="number"
          min="1"
          max="10"
          name="rows"
          class="rows-textbox"
        />
        <div
          class="btn btn-blueviolet btn-inline-block btn-create"
          @click="addRow(rownum);"
          v-show="rows.length < 10"
        >
          <i class="material-icons icons-in-table icons-update">add_circle</i>
        </div>
      </div>
    </div>
    <div id="stock-move-list" class="stock-move-list">
      <table id="StockTable" class="table table-hover table-striped sortable">
        <thead>
          <tr>
            <th>Event Date</th>
            <th>Product Name</th>
            <th>Packing</th>
            <th>Market Price</th>
            <th>Buying Price</th>
            <th>Quantity</th>
            <th>In/Out</th>
            <th>Expired By</th>
            <th>Used By</th>
            <th>Store Location</th>
            <th>Store Section</th>
            <th>Special Requirements</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <!-- Event Date -->
            <td><datepicker :value="row.eventDate"></datepicker></td>
            <td>
              <!-- Product Name -->
              <input type="text" name="product" v-model="row.productName" />

              <!-- product Name -->
              <!--
                <select v-model="row.productName">
                  <option>- - - -</option
                  ><br />
                  <option value="CHICKEN">Chicken</option>
                  <option value="BEEF">Beef</option>
                </select>
              -->
            </td>
            <td>
              <!-- Packing -->
              <!--
                <select v-model="row.packing">
                  <option>- - - -</option
                  ><br />
                  <option value="20">20kg per pack</option>
                  <option value="10">10 kg per pack</option>
                </select>
              -->

              <!-- Packing -->
              <input type="text" name="packing" v-model="row.packing" />
            </td>
            <td>
              <!-- Market Price -->
              <input
                v-model.number="row.marketPrice"
                type="number"
                min="0"
                max="999999999"
                name="price"
                class="rows-textbox"
              />
            </td>
            <td>
              <!-- Buying Price -->
              <input
                v-model.number="row.buyingPrice"
                type="number"
                min="0"
                max="999999999"
                name="buyprice"
                class="rows-textbox"
              />
            </td>
            <td>
              <!-- Quantity -->
              <input
                v-model.number="row.quantity"
                type="number"
                min="0"
                max="999999999"
                name="quantity"
                class="rows-textbox"
              />
            </td>
            <td>
              <!-- In/Out Toggle -->
              <div class="switches">
                <toggle-button
                  :value="row.inOut"
                  :labels="{ checked: 'IN', unchecked: 'OUT' }"
                />
              </div>
            </td>
            <!-- Expired by -->
            <td><datepicker :value="row.expiredby"></datepicker></td>
            <!-- Used by -->
            <td><datepicker :value="row.usedby"></datepicker></td>
            <!-- Store location -->
            <td><input type="text" v-model="row.storelocation" /></td>
            <!-- Store Section -->
            <td><input type="text" v-model="row.storesection" /></td>
            <!-- Special requirements -->
            <td><input type="text" v-model="row.specialrequirements" /></td>
            <!-- Remarks -->
            <td><input type="text" v-model="row.remarks" /></td>
            <td>
              <div class="btn-pane">
                <div
                  class="btn btn-inline-block btn-in-table"
                  @click="updateRow(row);"
                >
                  <i class="material-icons icons-in-table icons-update"
                    >check_circle</i
                  >
                </div>
                <div
                  class="btn btn-inline-block btn-in-table"
                  @click="removeRow(row);"
                >
                  <i class="material-icons icons-in-table icons-delete"
                    >remove_circle</i
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "MoveManage",
  components: {
    datepicker: Datepicker
  },
  data() {
    console.log("getting data");
    return {
      saveData: null,
      rownum: 1
    };
  },
  computed: {
    rows: {
      get() {
        console.log("getting rows");
        if (!this.$store.state.stockMovements) {
          console.log("stockeMovements is undefined");
          this.initData();
          return [];
        }
        return this.$store.state.stockMovements;
      },
      set(value) {
        this.updateData();
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
      console.log(JSON.stringify(this.$store.state.stockMovements));
      return this.$store.state.stockMovements;
    },
    updateRow: function(value) {
      this.$store.dispatch("UPDATE_STOCKMOVES", value);
    },
    initData: async function() {
      console.log("initData");

      let result = await this.$store.dispatch("LOAD_ALL_STOCKMOVES");
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(err => {
      //   console.log("error");
      //   console.log(err);
      // });
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(this.$store.state.stockMovements));
    },
    updateData: async function() {
      console.log("updateData");
      this.rows = this.$store.state.stockMovememnts;
    },
    addRow: async function(count) {
      var numRows = this.rows.length;

      if (numRows >= 10) return;

      for (var i = 1; i <= count; i++) {
        await this.$store.dispatch("ADD_STOCKMOVES");
        this.rows.push();
        if (++numRows === 10) break;
      }

      console.log("return from add");
      console.log(this.$store.state.stockMovements);
      // this.$router.push("/bulkInput");
    },
    removeRow: function(row) {
      //console.log(row);
      this.$store.dispatch("DELETE_STOCKMOVES", row);
    }
  }
};
</script>

<style>
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
  overflow: scroll;
}
</style>
