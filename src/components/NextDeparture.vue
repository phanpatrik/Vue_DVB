<template>
  <div class="wrapper">
    <h1>DVB App</h1>

    <form>
      <label>Haltestelle: <input type="text" v-model="input.stop" /> </label>
      <button type="button" @click="getStop">Drück mich!</button>
    </form>

    <br />

    <div class="warning" v-if="isEmpty">
      Bitte gib eine Haltestelle ein!
    </div>

    <div class="output" v-if="output.stopName">
      <table align="center">
        <tr>
          <td>Haltestelle:</td>
          <td>{{ output.stopName }}</td>
        </tr>
        <tr>
          <td>Steig:</td>
          <td>{{ output.platform }}</td>
        </tr>
        <tr>
          <td>tatsächliche Uhrzeit:</td>
          <td>{{ output.realTime }}</td>
        </tr>
        <tr>
          <td>geplante Uhrzeit:</td>
          <td>{{ output.scheduledTime }}</td>
        </tr>
        <tr>
          <td>Verkehrsmitteltyp:</td>
          <td>{{ output.typ }}</td>
        </tr>
        <tr>
          <td>Pünktlichkeit:</td>
          <td>{{ output.isInTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "NextDeparture",
  data: function() {
    return {
      input: {
        stop: null
      },
      output: {
        stopName: null,
        platform: null,
        realTime: null,
        scheduledTime: null,
        typ: null,
        isInTime: null
      },
      isEmpty: null
    };
  },
  created: function() {},
  methods: {
    getStop: function() {
      const vm = this;
      if (
        vm.input.stop == "" ||
        vm.input.stop == null ||
        !vm.input.stop.replace(/\s/g, "").length
      ) {
        vm.isEmpty = true;
        return;
      }
      vm.isEmpty = false;
      const path =
        "https://webapi.vvo-online.de/tr/pointfinder?format=json&query=" +
        vm.input.stop.toString() +
        "&stopsOnly=true";
      axios
        .get(path)
        .then(function(response) {
          let stopId = response.data.Points[0].split("|", 1);
          stopId = stopId[0];
          vm.getDepartureInfos(stopId);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    getDepartureInfos: function(stopId) {
      let vm = this;
      const path =
        "https://webapi.vvo-online.de/dm/?format=json&stopid=" +
        +stopId.toString();
      axios
        .get(path)
        .then(function(response) {
          vm.output.stopName = response.data.Name;
          vm.output.platform = response.data.Departures[0].Platform.Name;
          vm.output.realTime = vm.convertTimestamp(
            response.data.Departures[0].RealTime
          );
          vm.output.scheduledTime = vm.convertTimestamp(
            response.data.Departures[0].ScheduledTime
          );
          vm.output.typ = response.data.Departures[0].Mot;
          if (response.data.Departures[0].State == "InTime") {
            vm.output.isInTime = "Läuft nach Plan - Manni ist zufrieden :) .";
          } else if (response.data.Departures[0].State == "Delayed") {
            vm.output.isInTime = "**** Läuft nicht nach Plan! O_+ ";
          } else {
            vm.output.isInTime = "Das sollte nicht passieren.";
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },

    convertTimestamp: function(unix_timestamp_string) {
      let unix_timestamp = parseInt(unix_timestamp_string.substr(6, 10));
      console.log(unix_timestamp);
      var date = new Date(unix_timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      console.log(formattedTime);
      return formattedTime;
    }
  }
};
</script>
