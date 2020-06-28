<template>
  <div class="todo-add">
    <v-btn :color="color" dark fab fixed right bottom @click="dialog = true">
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
    <!-- Dialog to add ToDo -->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>{{ listName }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addTask">
            <v-text-field autofocus v-model="task" placeholder="New task"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialog = false" text>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!taskValid" text color="primary" @click="addTask">Add task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Task } from "@/types/models";

@Component
export default class TaskAdd extends Vue {
  @Prop() readonly color!: string;

  private dialog = false;
  private task = "";

  // -- Methods --
  addTask() {
    if (this.task.length > 0) {
      const data = new Task(this.task);
      this.$store.dispatch("task/addTask", data);
      this.task = "";
      // Close dialog
      this.dialog = false;
    }
  }

  // -- Computed Properties --
  get taskValid(): boolean {
    return this.task.length > 0;
  }
  get listName(): string {
    return this.$store.getters["task/getListName"];
  }
}
</script>
