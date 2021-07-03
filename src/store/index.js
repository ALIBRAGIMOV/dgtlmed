import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: [],
    task: {
      id: 0,
      name: '',
      status: '',
      description: '',
      createData: null,
    },
    addSetting: false,
  },
  mutations: {
    addToList: (state, params) => {
      if (params) {
        state.taskList = params;
      } else {
        if (state.taskList.length) state.task.id = state.taskList[state.taskList.length - 1].id + 1;
        state.task.createData = new Date().toLocaleString();
        state.taskList.push(state.task);
      }
      localStorage.setItem('taskList', JSON.stringify(state.taskList));

      state.task = {
        id: 0,
        name: '',
        status: '',
        description: '',
        createData: 0,
      };
      state.addSetting = !state.addSetting;
    },
    settingHandler: (state) => {
      state.addSetting = !state.addSetting;
    },
    deleteHandler: (state, cardRemove) => {
      state.taskList = state.taskList.filter((t) => t !== cardRemove);
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    checkerList: (state) => {
      if (state.taskList) {
        state.taskList = JSON.parse(localStorage.getItem('taskList'));
      }
    },
    changeTask: (state, taskData) => {
      // eslint-disable-next-line prefer-destructuring
      state.task = taskData[0];
      const i = state.taskList.findIndex((el) => el.id === state.task.id);
      if (state.taskList[i]) {
        state.taskList[i] = state.task;
        localStorage.setItem('taskList', JSON.stringify(state.taskList));
      } else {
        state.taskList.push(state.task);
      }
    },
    clearData: (state) => {
      state.task = {
        id: 0,
        name: '',
        status: '',
        description: '',
        createData: 0,
      };
    },
  },
  actions: {
    ADD_TASK({ commit }, params) {
      commit('addToList', params);
    },
    OPEN_SETTING({ commit }) {
      commit('settingHandler');
    },
    DELETE_TASK({ commit }, cardRemove) {
      commit('deleteHandler', cardRemove);
    },
    CHECK_LIST({ commit }) {
      commit('checkerList');
    },
    CHANGE_TASK({ commit }, taskData) {
      commit('changeTask', taskData);
    },
    CLEAR_TASK_DATA({ commit }) {
      commit('clearData');
    },
  },
  modules: {
  },
  getters: {
    TaskName(state) {
      return state.task;
    },
  },
});
