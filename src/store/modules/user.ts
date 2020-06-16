import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../index";

interface UserState {
  version?: string;
}

const state: UserState = {
  version: "v1.0",
};

const getters: GetterTree<UserState, RootState> = {};

const mutations: MutationTree<UserState> = {};

const actions: ActionTree<UserState, RootState> = {};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
