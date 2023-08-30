import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTasksStore = defineStore("tasksStore", () => {
  const tasks = ref([]);

  const tasksGetters = computed(() => tasks.value);

  const createTask = (task) => {
    tasks.value.push(task);
  };

  return {
    tasks,
    tasksGetters,
    createTask,
  };
});
