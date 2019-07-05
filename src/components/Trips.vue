<template>
  <div class="wrapper">
    <h1>DVB App</h1>

    <form>
      <label
        >Starthaltestelle:
        <input type="text" v-model="input.stopStart" /> </label
      ><br />
      <label
        >Zielhaltestelle:
        <input type="text" v-model="input.stopTarget" /> </label
      ><br />
      <button type="button" @click="getStops">Drück mich!</button>
    </form>

    <br />
    <p class="fromTto">
      Von: {{ output.stopStartName }} ---> Nach: {{ output.stopTarName }}
    </p>

    <ul>
      <li v-for="tripRoute in tripRoutes">
        Preis: {{ tripRoute.Price }} €
        <div v-for="motLink in tripRoute.MotChain">
          Linie: {{ motLink.Name }} / Richtung: {{ motLink.Direction }}<br />
          Typ: {{ motLink.Type }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Trips",
  data: function() {
    return {
      input: {
        stopStart: null,
        stopTarget: null
      },
      output: {
        stopStartName: null,
        stopTarName: null
      },
      tripRoutes: []
    };
  },
  methods: {
    getStops: async function() {
      const vm = this;
      var path =
        "https://webapi.vvo-online.de/tr/pointfinder?format=json&query=" +
        vm.input.stopStart.toString() +
        "&stopsOnly=true";

      let startRes = await axios.get(path);
      startRes = startRes.data.Points[0].split("|");
      let stopStartId = startRes[0];
      vm.output.stopStartName = startRes[3];

      path =
        "https://webapi.vvo-online.de/tr/pointfinder?format=json&query=" +
        vm.input.stopTarget.toString() +
        "&stopsOnly=true";

      let targetRes = await axios.get(path);
      targetRes = targetRes.data.Points[0].split("|");
      let stopTarId = targetRes[0];
      vm.output.stopTarName = targetRes[3];

      vm.getDepartureInfos(stopStartId, stopTarId);
    },
    getDepartureInfos: async function(stopStartId, stopTarId) {
      const vm = this;
      var path =
        "https://webapi.vvo-online.de/tr/trips?origin=+" +
        stopStartId +
        "&destination=" +
        stopTarId +
        "&format=json";

      vm.tripRoutes = await axios.get(path);
      vm.tripRoutes = vm.tripRoutes.data.Routes;
    }
  }
};
</script>
