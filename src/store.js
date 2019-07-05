/*
Diese Datei dient zur zentralen, globalen Speicherung von Daten, kann modularisiert werden
*/
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // zentraler Datenspeicher
  state: {},
  // manipuliert / den State, nur synchron erlaubt
  mutations: {},
  // unterstützt async-Programmierung, Zugriff auf getters, state, mutation, commits, dispatching
  actions: {}
});
