import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
Vue.config.productionTip = false;

Vue.filter("UpperCase", value => {
  if (!value) {
    return "";
  } else {
    return value.toUpperCase();
  }
});
Vue.filter("time", value => {
  if (!value) {
    return "";
  } else {
    return moment(value).format('LL');
  }
});

new Vue({
  render: h => h(App)
}).$mount("#activityApp");
