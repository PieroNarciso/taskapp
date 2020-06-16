<template>
  <div class="app-navbar">
    <v-app-bar :color="color" flat dark>
      <v-toolbar-title>Tasks App</v-toolbar-title>
      <v-spacer></v-spacer>
      <app-navbar-menu icon="mdi-dots-vertical"></app-navbar-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import AppNavbarMenu from "@/components/layout/AppNavbarMenu.vue";

@Component({
  components: {
    AppNavbarMenu
  }
})
export default class AppNavbar extends Vue {
  @Prop() readonly color!: string;
}
</script>