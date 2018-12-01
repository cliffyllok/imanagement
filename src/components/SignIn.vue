<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout v-if="user.authLevel === '1'" row class="mt-2 mb-5">
        <v-flex xs8 offset-xs2>
          <h3 class="mb-2 text-md-center">{{ today | formatDateFull }}</h3>
          <router-link to="/productsSellBy">
            <h4 class="text-md-center">
              There are {{ productsDue.length }} items with upcoming SellBy
              dates.
            </h4>
          </router-link>
        </v-flex>
      </v-layout>

      <v-layout v-else row class="mt-3 mb-5">
        <v-flex xs8 offset-xs2>
          <h3>{{ today | formatDateFull }}</h3>
        </v-flex>
      </v-layout>
      <v-card>
        <v-layout row class="primary mt-2 white--text text-md-center">
          <v-flex fluid>
            <h2 class="mt-2 mb-0">Item Check In</h2>
            <br />
            <p class="demo">
              To demo, click on Products and copy a scancode from any item
              missing a sell by date. <br />Click on Check in, and enter copied
              scancode in this field. <br />Or enter a random scancode and add
              as a new Item.
            </p>
          </v-flex>
        </v-layout>
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
