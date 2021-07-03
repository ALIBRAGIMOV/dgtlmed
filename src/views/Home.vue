<template>
  <div class="homeContainer">
    <div>
      <button class="createButton" @click="addHandler">
        {{ addLabel }}
      </button>
    </div>
    <div class="cardContainer">
      <div>
        <add-task-setting v-show="addSetting"/>
      </div>
      <div v-show="!addSetting"
           v-for="t in taskList"
           :key="t.name"
           style="padding: 1rem"
      >
        <div class="handlerCardWrapper">
          <div class="changeButtonContainer">
        <span>
          Изменить
        </span>
            <button @click="changeHandler(t)" class="changeButton">
              ✏️
            </button>
          </div>
          <div class="deleteButtonContainer">
        <span>
          Удалить задачу
      </span>
            <button class="deleteButton" @click="handleDelete(t)">
              ❌
            </button>
          </div>
        </div>
        <div
          class="cardWrapper"
          :class="{
          'process': t.status === 'В процессе',
          'completed': t.status === 'Завершена',
          'new': t.status === 'Новая',
         }"
        >
          <span>Название задачи: {{ t.name }}</span>
          <span>Описание задачи: {{ t.description }}</span>
          <span>Статус задачи: {{ t.status }}</span>
          <span>Дата создания: {{ t.createData }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import addTaskSetting from '../components/addTaskSetting.vue';

export default {
  name: 'Home',
  computed: {
    ...mapState(['taskList', 'task', 'addSetting']),
  },
  data() {
    return {
      addLabel: 'Добавить',
    };
  },
  components: {
    addTaskSetting,
  },
  methods: {
    addHandler() {
      this.$store.dispatch('OPEN_SETTING');
    },
    handleDelete(cardRemove) {
      this.$store.dispatch('DELETE_TASK', cardRemove);
    },
    changeHandler(cardChange) {
      this.$router.push(({ path: `/task/${cardChange.id}` }));
    },
  },
  watch: {
    addSetting() {
      if (this.addLabel === 'Добавить') {
        this.addLabel = 'Отменить';
      } else {
        this.addLabel = 'Добавить';
      }
    },
  },
  mounted() {
    if (localStorage.getItem('taskList')) {
      this.$store.dispatch('CHECK_LIST');
    }
    this.$store.dispatch('CLEAR_TASK_DATA');
  },
};
</script>

<style lang="scss" scoped>
.homeContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .createButton {
    background: antiquewhite;
    border: none;
    border-radius: 12px;
    padding: 7px;
    cursor: pointer;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }

  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .cardWrapper {
      display: flex;
      flex-direction: column;
      border-radius: 11px;
      align-items: flex-start;
      padding: 1rem;
    }

    .handlerCardWrapper {
      display: flex;
      justify-content: space-between;

      .changeButtonContainer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        align-items: center;

        .changeButton {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }
      }

      .deleteButtonContainer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        align-items: center;

        .deleteButton {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
  }

  .completed {
    border: 3px solid #45b95ee6;
  }

  .process {
    border: 3px solid #c7bc33de;
  }

  .new {
    border: 3px solid #4db2e0c7;
  }
}
</style>
