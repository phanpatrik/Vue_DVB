/*
Vue-Router ist ein eigenständiges Modul zum Installieren.
Hier werden componenten mit einem URL-Pfad verknüpft
*
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      /* "lazy-load", componenten werden erst geladen, wenn sie abgerufen werden
          alternativ kann man die Componenten importieren, global registrieren und hier verknüofen
      */
      component: () => import("@/components/NextDeparture")
    },
    {
      path: "/imprint",
      name: "imprint",
      component: () => import("@/components/Imprint")
    },
    {
      path: "/trips",
      name: "trips",
      component: () => import("@/components/Trips")
    }
  ]
});
