import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import createPersistedState from "vuex-persistedstate";

import { user } from "./modules/user";
import { task } from "./modules/task";

Vue.use(Vuex);

export interface RootState {
  version?: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    user,
    task,
  },
  plugins: [
    createPersistedState({
      key: "State",
    }),
  ],
};

export default new Vuex.Store<RootState>(store);
