<script>
import i18n from "./plugins/i18n";
export default {
  data() {
    return {
      sidebar: false,
      mini: false,
      right: null,
      languages: [
        { flag: "us", language: "en", title: "English" },
        { flag: "cn", language: "cn", title: "中文" }
      ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [];

      // if (
      //   this.$store.state.user &&
      //   this.$store.state.user.authLevel === "1" &&
      //   this.$store.state.products.length > 0
      // ) {
      //used to bypass sign-in
      if (true) {
        console.log("user valid");
        menuItems = [
          { icon: "home", title: this.$t("home"), link: "/Report" },
          { icon: "view_list", title: this.$t("stock"), link: "/StockList" },
          { icon: "note_add", title: this.$t("addMove"), link: "/MoveList" }
        ];
      } else {
        console.log("routing to signin from App");
        //this.$router.replace("/signIn");
        //this.$router.replace("/StockList");
      }

      return menuItems;
    },
    userIsAuthenticated() {
      console.log("auth");
      return this.$store.state.user;
    },
    user() {
      console.log("get user App");
      return this.$store.state.user;
    },
    hideNav() {
      console.log("App: hideNav");
      return this.$store.state.hideNav;
    }
  },
  methods: {
    logOut() {
      console.log("App: logout");
      this.$store.commit("clearAll");
    },
    changeLocale(locale) {
      i18n.locale = locale;
    }
  }
};
</script>

<template>
  <v-app>
    <div :class="{ leftpanel: sidebar }">
      <v-sidebar
        v-if="sidebar"
        v-model="sidebar"
        class="primary sidebar"
        height="100%"
        :close-on-click="false"
      >
        <div class="header-sidebar ">
          <v-btn class="sidebar-button">{{ $t("appName") }}</v-btn>
        </div>
        <v-sidebar-item
          v-for="item in this.menuItems"
          :key="item.title"
          :index="item.id"
          :icon="item.icon"
          class="sidebar-item "
        >
          <v-btn
            class="sidebar-button white--text"
            flat
            :key="item.title"
            :to="item.link"
          >
            {{ item.title }}
          </v-btn>
          <!-- <v-button :icon="item.icon"></v-button> -->
        </v-sidebar-item>
        <!--
          <v-list class="pa-1">
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>

                  <img src="https://randomuser.me/api/portraits/men/85.jpg" />

              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Inventory Management</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-list-tile
              v-for="item in this.menuItems"
              :key="item.title"
              :to="item.link"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        -->
      </v-sidebar>
    </div>
    <div v-bind:class="{ rightpanel: sidebar }">
      <v-toolbar v-if="!hideNav" class="primary" close-on-click>
        <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar;" />

        <v-toolbar-title class="white--text ml-0">
          <router-link
            v-if="userIsAuthenticated && $store.state.user.authLevel === '1'"
            to="/itemCheckin"
            tag="span"
            style="cursor: pointer"
          >
            <v-btn flat class="white--text ml-0">Inventory Management</v-btn>
          </router-link>

          <v-btn v-else flat class="white--text ml-0">{{
            $t("appName")
          }}</v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
            class="white--text"
          >
            {{ item.title }}
          </v-btn>
          <v-btn
            flat
            class="white--text lang-button"
            v-for="entry in languages"
            :key="entry.title"
            @click="changeLocale(entry.language);"
          >
            <flag :iso="entry.flag" v-bind:squared="false" /> {{ entry.title }}
          </v-btn>
          <v-btn flat class="white--text" @click="logOut">
            {{ $t("logout") }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <v-container fluid> <router-view></router-view> </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<style scoped>
.lang-button {
  padding: 1px;
  border: 1px solid green;
  background-color: #2cb337;
  font-size: 0.8em;
  margin: 4px;
}
.leftpanel {
  height: 100%;
  float: left;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: #41706791;
}
.rightpanel {
  float: left;
  margin-left: 300px;
}
.sidebar-item {
  display: block;
  align-content: left;
}

.sidebar-button {
  width: 100%;
}
</style>
