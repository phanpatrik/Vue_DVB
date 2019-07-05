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
    <!-- mustache-syntax ( {{}} )  wacht über die Variable und gibt ihren Wert auch bei Veränderungen wieder-->
    <p class="fromTto">
      Von: {{ output.stopStartName }} ---> Nach: {{ output.stopTarName }}
    </p>

    <ul>
      <!-- gibt die nächsten Verbindunginfos aus-->
      <li v-for="tripRoute in tripRoutes">
        Preis: {{ tripRoute.Price }} €
        <!-- gibt Infos zu einer einzelnen Verbindungsmöglichkeit aus -->
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
  // in componenten muss data eine Funktion sein
  // sie bindet die Daten an die aktuelle Instanz
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
  // hier kann man Methoden definieren, die von Lebenzyklen, UI oder andere Methoden aufgerufen werden sollen
  methods: {
    // wird durch button-click ausgeführt, der Zusatz async ist notwendig um mit await zu arbeiten
    getStops: async function() {
      // vm = ViewModel, wird für Referezen auf die Vue-Instanz genutzt
      const vm = this;

      // API-Call , wertet anschließend das Ergebnis aus und filtert die StopId und den vollständigen Namen
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
