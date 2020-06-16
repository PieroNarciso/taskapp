<template>
  <div class="task-list">
    <v-card flat>
      <v-card-title>{{ listName }}</v-card-title>
      <v-list dense>
        <template v-for="task in noCompletedTasks">
          <v-list-item
            :key="task.id"
            @click="changeCompletedStatus(task.id, true)"
          >
            <v-list-item-icon>
              <v-icon>mdi-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ task.title }}</v-list-item-content>
          </v-list-item>
          <v-divider :key="task.title"></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-card flat v-if="completedTasks.length > 0">
      <v-list dense>
        <v-divider></v-divider>
        <v-list-group :ripple="false">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content
                >Completed ({{ completedTasks.length }})</v-list-item-content
              >
            </v-list-item>
          </template>
          <v-list>
            <template v-for="task in completedTasks">
              <v-list-item
                :key="task.id"
                @click="changeCompletedStatus(task.id, false)"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="text-decoration-line-through">{{
                  task.title
                }}</v-list-item-content>
              </v-list-item>
              <v-divider :key="task.title"></v-divider>
            </template>
          </v-list>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Task } from "@/types/models";

@Component
export default class TaskList extends Vue {
  // -- Methods --
  changeCompletedStatus(id: number, completed: boolean) {
    this.$store.dispatch("task/changeCompletedStatus", {
      id: id,
      completed: completed,
    });
  }

  // -- Computed Properties --
  get noCompletedTasks(): Task[] {
    return this.$store.getters["task/getNoCompletedTasks"];
  }
  get completedTasks(): Task[] {
    return this.$store.getters["task/getCompletedTasks"];
  }
  get listName(): string {
    return this.$store.getters["task/getListName"];
  }
}
</script>
