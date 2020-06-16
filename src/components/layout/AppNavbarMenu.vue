<template>
  <div class="the-menu">
    <v-bottom-sheet v-model="showSheet">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>

      <v-list rounded>
        <v-list-item @click="deleteTasks" :disabled="isDeleteDisable">
          <v-list-item-title>Delete all completed tasks</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>

    <v-snackbar dark v-model="showSnackbar" left>
      {{ snackbarContent }}
      <template v-slot:action>
        <v-btn @click="undoDeletedTasks" text color="yellow">Undo</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TheMenu extends Vue {
  @Prop({ required: true }) readonly icon!: string;

  private showSheet = false;
  private showSnackbar = false;

  public deleteTasks() {
    this.showSheet = false;
    this.showSnackbar = true;
    this.$store.dispatch("task/deleteCompletedTasks");
    setTimeout(() => {
      this.$store.dispatch("task/removeDeletedTasks");
    }, 5000);
  }

  public undoDeletedTasks() {
    this.showSnackbar = false;
    this.$store.dispatch("task/undoDeletedTasks");
  }

  // -- Computed Properties --
  get isDeleteDisable(): boolean {
    return this.$store.getters["task/getCompletedTasks"].length == 0;
  }
  get snackbarContent(): string {
    return `${this.$store.getters["task/getDeletedTasks"].length} deleted tasks`;
  }
}
</script>
