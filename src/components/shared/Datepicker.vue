<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "Datepicker",
  components: {
    datepicker: Datepicker
  },
  data() {
    return {
      menu: false,
      modal: false
    };
  },
  props: {
    date: new Date()
  },
  computed: {
    targetDate: () => {
      return this.date.toISOString().substr(0, 7);
    }
  },
  methods: {}
};
</script>

<template>
  <div class="subjects-content">
    <v-flex xs11 sm5>
      <v-menu
        ref="menu"
        :close-on-content-click="true"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Picker in menu"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" type="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false;">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date);">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </div>
</template>

<style></style>
