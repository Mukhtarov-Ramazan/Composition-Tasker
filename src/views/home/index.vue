<script setup>
import { ref, computed } from "vue";
import { useTasksStore } from "@/store/tasksStore";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";

import TheTable from "@/components/TheTable/TheTable.vue";
import TheTableRow from "@/components/TheTable/TheTableRow.vue";
import TheTableColomn from "@/components/TheTable/TheTableColomn.vue";
import ThePopUp from "@/components/ThePopUp.vue";
import TheInput from "@/components/TheInput.vue";
import TheTextarea from "@/components/TheTextarea.vue";

const tasksStore = useTasksStore();

// PopUp
const activiePopUp = ref(false);
const closePopUp = () => {
  activiePopUp.value = false;
};

// Table
const tableHeadNames = ["Id", "Title", "Description", "Status", "Date", "Open"];
const tableSizeColomns = "50px 1.5fr 2.5fr 1fr 1fr .5fr";

// Sorting Task
// const sortField = ref("id");
// const typeSort = ref("asc");

// const tasksSorting = computed(() => {
//   return tasksStore.tasksGetters.value.sort((a, b) => {
//     let modifier = 1;
//     if (typeSort.value === "desc") modifier = -1;
//     if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
//     if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
//     return 0;
//   });
// });

// const setSort = (name) => {
//   if (sortField.value === name) {
//     if (typeSort.value === "asc") {
//       typeSort.value = "desc";
//     } else {
//       typeSort.value = "asc";
//     }
//   } else {
//     sortField.value = name;
//   }
// };

// Create Form

// const createForm = ref({
//   title: "",
//   description: "",
//   date: null,
//   status: "Выполняется",
// });

const title = ref("");
const description = ref("");
const date = ref("");
const setTask = () => {
  v$.value.$touch()
  if (v$.value.$error) return
  const task = {
    title: title.value,
    description: description.value,
    date: date.value,
    status: "Выполняется",
  };
  tasksStore.createTask(task);
  activiePopUp.value = false;
};

// Vuelidate
const rules = computed(() => ({
  title: {
    minLength: helpers.withMessage(
      "Минимальная длина: 5 символов",
      minLength(5)
    ),
    required: helpers.withMessage("Заполните поле", required),
  },
  description: {
    minLength: helpers.withMessage(
      "Минимальная длина: 25 символов",
      minLength(25)
    ),
    required: helpers.withMessage("Заполните поле", required),
  },
  date: {
    required: helpers.withMessage("Заполните поле", required),
  },
}));
const v$ = useVuelidate(rules, { title, description, date });
</script>

<template>
  <div class="home">
    <ThePopUp v-if="activiePopUp" @closePopUp="closePopUp">
      <form @submit.prevent class="form">
        <TheInput
          label="Заголовок"
          name="title"
          placeholder="Ведите заголовок"
          width="96.6%"
          :error="v$.title.$errors"
          v-model:value="v$.title.$model"
        />
        <TheTextarea
          label="Описание"
          name="description"
          placeholder="Ведите описание"
          width="96.6%"
          rows="5"
          :error="v$.description.$errors"
          v-model:value="v$.description.$model"
        />
        <TheInput
          label="Дата"
          name="date"
          type="date"
          width="96.6%"
          placeholder="Ведите дату"
          :error="v$.date.$errors"
          v-model:value="v$.date.$model"
        />

        <button class="btn btn--create" @click="setTask">Cоздать</button>
      </form>
    </ThePopUp>
    <div class="container">
      <div class="home__row">
        <div class="home__select">Это если чё селект</div>
        <button class="btn btn--create" @click="activiePopUp = true">
          Создать
        </button>
      </div>
      <TheTable
        v-if="tasksStore.tasksGetters.length"
        :headNames="tableHeadNames"
        :columnTemplates="tableSizeColomns"
        @sorting="setSort"
      >
        <TheTableRow
          v-for="(task, i) in tasksStore.tasksGetters"
          :key="i"
          :columnTemplates="tableSizeColomns"
        >
          <TheTableColomn :columnTitle="tableHeadNames[0]">
            {{ i + 1 }}
          </TheTableColomn>

          <TheTableColomn :columnTitle="tableHeadNames[1]">
            {{ task.title }}
          </TheTableColomn>

          <TheTableColomn :columnTitle="tableHeadNames[2]">
            {{ task.description }}
          </TheTableColomn>

          <TheTableColomn :columnTitle="tableHeadNames[3]">
            {{ task.status }}
          </TheTableColomn>

          <TheTableColomn :columnTitle="tableHeadNames[4]">
            {{ task.date }}
          </TheTableColomn>

          <TheTableColomn :columnTitle="tableHeadNames[5]">
            <button class="btn">Открыть</button>
          </TheTableColomn>
        </TheTableRow>
      </TheTable>

      <div class="home__emty" v-else>
        <p>У вас нет задач</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin-top: 150px;
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  &__select {
    min-width: 70%;
    padding: 12px 20px;
    background-color: #0084f4;
    border-radius: 7px;
    color: #f2f2f2;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
  &__emty {
    margin: 160px 0;
    font-size: 46px;
    font-weight: 700;
    color: #777;
    text-align: center;
  }
}
</style>
