import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../index";

import { Task } from "@/types/models";

interface TaskState {
  tasks: Task[];
  deletedTasks: Task[];
  listName: string;
  version?: string;
}

const state: TaskState = {
  tasks: [],
  deletedTasks: [],
  listName: "My List",
  version: "v1.0",
};

const getters: GetterTree<TaskState, RootState> = {
  getTasks: (state: TaskState): Task[] => state.tasks,
  getNoCompletedTasks: (state: TaskState): Task[] =>
    state.tasks.filter((e) => e.isCompleted == false),
  getCompletedTasks: (state: TaskState): Task[] =>
    state.tasks.filter((e) => e.isCompleted == true),
  getDeletedTasks: (state: TaskState) => state.deletedTasks,
  getListName: (state: TaskState): string => state.listName,
};

const mutations: MutationTree<TaskState> = {
  changeListName: (state: TaskState, name: string) => {
    state.listName = name;
  },
  addTask: (state: TaskState, task: Task) => {
    state.tasks.push(task);
  },
  changeCompletedStatus: (
    state: TaskState,
    data: { id: number; completed: boolean }
  ) => {
    const task = state.tasks.find((e) => e.id == data.id);
    if (task) {
      task.isCompleted = data.completed;
    }
  },
  deleteCompletedTasks: (state: TaskState) => {
    state.tasks = state.tasks.filter((e) => {
      if (e.isCompleted == true) {
        state.deletedTasks?.push(e);
      }
      return e.isCompleted == false;
    });
  },
  undoDeletedTasks: (state: TaskState) => {
    state.tasks = [...state.tasks, ...state.deletedTasks];
    state.deletedTasks.length = 0;
  },
  removeDeletedTasks: (state: TaskState) => {
    state.deletedTasks.length = 0;
  },
};

const actions: ActionTree<TaskState, RootState> = {
  addTask: (context, task: Task) => {
    context.commit("addTask", task);
  },
  changeCompletedStatus: (
    context,
    data: { id: number; completed: boolean }
  ) => {
    context.commit("changeCompletedStatus", data);
  },
  deleteCompletedTasks: (context) => {
    context.commit("deleteCompletedTasks");
  },
  undoDeletedTasks: (context) => {
    context.commit("undoDeletedTasks");
  },
  removeDeletedTasks: (context) => {
    context.commit("removeDeletedTasks");
  },
};

export const task: Module<TaskState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
