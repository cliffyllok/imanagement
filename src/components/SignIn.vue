<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout row class="mt-3 mb-5">
        <v-flex xs8 offset-xs2>
          <h1>Please sign in first</h1>
          <v-textbox
            type="text"
            name="username"
            v-model="username"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password"
          />
          <button type="button" v-on:click="login();">Login</button>
        </v-flex>
      </v-layout>
      <v-card>
        <v-layout row>
          <v-flex xs12>
            <form>
              <v-layout row class="mt-2">
                <v-flex xs12 sm6 offset-sm3>
                  <p class="mb-3">{{ messageSuccess }}{{ message }}</p>

                  <v-layout row v-if="scancodeExists" class="mb-2">
                    <p>{{ item.receiptAlias }}</p>
                  </v-layout>

                  <v-text-field
                    v-model.trim="scancode"
                    v-focus
                    name="scancode"
                    label="Enter scancode"
                    id="scancode"
                    required
                    :onchange="getInput(this)"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row v-if="!scancodeExists">
                <v-flex xs12 sm6 offset-sm3> </v-flex>
              </v-layout>

              <v-layout row class="mb-4" v-show="scancodeExists">
                <v-flex xs12 sm6 offset-sm3>
                  <v-dialog persistent lazy full-width width="290px">
                    <v-text-field
                      slot="activator"
                      label="Sell By date"
                      v-model.trim="sellByDate"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model.trim="sellByDate" scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn flat color="secondary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>

              <v-layout row no-wrap>
                <v-flex xs12 sm6 offset-sm3 mb-4 wrap class="buttons">
                  <v-btn
                    class="primary"
                    :disabled="!formIsValid"
                    @click="addItem('/itemCheckIn');"
                    >Save</v-btn
                  >
                  <v-btn class="secondary ml-2" @click="clear">Clear</v-btn>
                  <v-btn
                    v-show="addNewItem"
                    class="info ml-2"
                    @click="$router.push('addNewItem');"
                    >Add Item</v-btn
                  >
                </v-flex>
              </v-layout>
            </form>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import format from "date-fns/format";
function censor(censor) {
  var i = 0;

  return function(key, value) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor == value
    )
      return "[Circular]";

    if (i >= 29)
      // seems to be a harded maximum of 30 serialized objects?
      return "[Unknown]";

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
}
export default {
  created() {
    console.log("created");
    // if (this.$store.state.user === null) {
    // } else {
    this.$router.push("/");
    // }
    setTimeout(() => {
      this.$store.commit("clearAll");
      this.$store.commit("setError", "Your session has expired!");
    }, 3600000);
  },
  data() {
    console.log("data");
    return {
      username: "",
      password: "",
      today: new Date()
    };
  },
  computed: {
    formIsValid() {
      console.log("form is valid");
      return this.sellByDate !== "";
    },
    user() {
      console.log("signin get user");
      //console.log("state" + JSON.stringify(this, censor(this)));
      return this.$store.state.user;
    },
    scancodeExists() {
      console.log("scancode");
      return this.$store.state.scancodeFound;
    },
    messageSuccess() {
      console.log("message success");
      return this.$store.state.messageSuccess;
    },
    item() {
      console.log("get item");
      return this.$store.state.loadedProduct;
    },
    productsDue() {
      console.log("produce due");
      return this.$store.getters.getSellBySoon;
    },
    message() {
      console.log("message");
      return this.$store.state.message;
    },
    addNewItem() {
      console.log("add new item");
      return this.$store.getters.addItem;
    }
  },
  methods: {
    addItem(dest) {
      console.log("add item");
      const today = new Date();
      const checkedInItem = {
        id: this.item.id,
        Brand: this.item.brandName,
        ReceiptAlias: this.item.receiptAlias,
        Scancode: this.scancode,
        SellbyDate: this.sellByDate,
        creatorId: this.$store.state.user.userId,
        editedBy: "",
        lastEditDate: format(today, "MMM Do YYYY h:mm A"),
        reorderDate: ""
      };
      this.$store.commit("setLoc", "/itemCheckIn");
      this.$store.dispatch("addNewItem", checkedInItem);
      document.getElementById("scancode").value = "";
      this.scancode = "";
      this.sellByDate = "";
      document.getElementById("scancode").focus();
    },
    logOut() {
      this.$store.commit("clearAll");
    },
    getInput() {
      let sc = this.scancode;
      if (sc !== "") {
        this.$store.dispatch("setLoadedScancode", sc);
      }
    },
    clear() {
      this.scancode = "";
      this.$store.commit("setScancodeStatus", false);
      this.$store.commit("clearMessage");
      this.$store.commit("setAddItem", false);
      this.$store.commit("clearLoadedScancode");
      document.getElementById("scancode").value = "";
      this.sellByDate = "";
      document.getElementById("scancode").focus();
    }
  }
};
</script>

<style scoped>
.demo {
  margin-top: 0;
  color: white;
  /* font-style: italic; */
  font-size: 13px;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg {
  color: slategray;
  font-size: 13px;
  margin-bottom: 10px;
}
p {
  font-size: 14px;
  margin-bottom: 10px;
  color: darkslategray;
}
</style>
