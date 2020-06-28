<template>
  <v-app>
    <app-navbar color="deep-orange"></app-navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppNavbar from "@/components/layout/AppNavbar.vue";

@Component({
  components: {
    AppNavbar
  }
})
export default class App extends Vue {}
</script>
