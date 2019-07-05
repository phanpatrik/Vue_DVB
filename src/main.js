import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

// erstellt die Vue-Instanz
new Vue({
  el: "#app",
  router,
  render: h => h(App) /* Befehl zum Rendern der Vue-componenten, knüpft an <div id="app"> in der index.html an
                        Erste Componente wird in App.vue gesucht */
});
