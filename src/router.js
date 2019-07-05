import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
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
