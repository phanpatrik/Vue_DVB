<template>
  <div id="app">
    <nav id="app-nav">
      <ul>
        <router-link tag="li" active-class="active" to="/">
          <a>Nächste Abfahrt 🚌</a>
        </router-link>

        <router-link tag="li" active-class="active" to="/imprint">
          <a>Impressum</a>
        </router-link>

        <router-link tag="li" active-class="active" to="/trips">
          <a>Trips</a>
        </router-link>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
