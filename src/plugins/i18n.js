import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/services/i18n-translate";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "cn", // set locale
  fallbackLocale: "en", // set fallback locale
  messages: messages // set locale messages
});

export default i18n;
