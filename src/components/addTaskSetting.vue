<template>
  <div class="taskSettingContainer">
    <div class="deleteButtonContainer" v-if="this.$route.params.id">
        <span>
          Удалить задачу
      </span>
      <button class="deleteButton"
              @click="handleDelete">
        ❌
      </button>
    </div>
    <div class="taskInputWrapper">
      <div class="inputSettingWrapper">
      <span>
        Название
      </span>
        <input type="text"
               v-model="taskName.name"
               placeholder="Название задачи" >
      </div>
      <div>
        <span>Статус</span>
        <select v-model="taskName.status">
          <option value='Новая'>Новая</option>
          <option value='В процессе'>В процессе</option>
          <option value='Завершена'>Завершена</option>
        </select>
      </div>
      <div>
      <span>
        Описание
      </span>
        <input type="text"
               v-model="taskName.description"
               placeholder="Описание" >
      </div>
      <div>
        <button class="saveButton" @click="addTask">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'addTaskSetting',
  computed: {
    ...mapGetters({
      taskName: 'TaskName',
    }),
    ...mapState(['taskList']),
  },
  methods: {
    addTask() {
      if (!this.$route.params.id) {
        this.$store.dispatch('ADD_TASK');
      } else {
        this.$store.dispatch('CHANGE_TASK', [this.taskName]).then(() => {
        });
        this.$router.push(({ path: '/' }));
      }
    },
    handleDelete() {
      const cardRemove = this.taskList.filter((t) => t.id === +this.$route.params.id);
      this.$store.dispatch('DELETE_TASK', cardRemove[0]);
      this.$router.push(({ path: '/' }));
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch('CHANGE_TASK',
        JSON.parse(localStorage.getItem('taskList')).filter((t) => t.id === +this.$route.params.id));
    }
  },
};
</script>

<style lang="scss" scoped>
.taskSettingContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .saveButton{
    background: #c3daffa3;
    border: none;
    border-radius: 12px;
    padding: 7px;
    cursor: pointer;
    margin-top: 0.6rem;
    font-size: 0.8rem;
  }
  .deleteButtonContainer{
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    align-items: center;
    .deleteButton{
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
    }
  }
  .taskInputWrapper{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    div{
      padding: 0.2rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
