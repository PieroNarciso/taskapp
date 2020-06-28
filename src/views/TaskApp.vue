<template>
  <div class="todo-app">
    <v-container>
      <task-list></task-list>
      <task-add color="deep-orange"></task-add>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskAdd from "@/components/TaskComponents/TaskAdd.vue";
import TaskList from "@/components/TaskComponents/TaskList.vue";

@Component({
  components: {
    TaskAdd,
    TaskList
  }
})
export default class TaskApp extends Vue {}
</script>