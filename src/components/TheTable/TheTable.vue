<script setup>
const props = defineProps({
  headNames: {
    type: Array,
    required: false,
  },
  columnTemplates: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["sorting"]);
const clickOnHead = (name) => {
  emit("sorting", name.toLowerCase());
};
</script>

<template>
  <div class="table-wrapper">
    <div class="table">
      <div
        class="table-head"
        :style="{ 'grid-template-columns': columnTemplates }"
      >
        <div
          class="table-head__name"
          v-for="(element, i) in headNames"
          :key="i"
          @click="clickOnHead(element)"
        >
          {{ element }}
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 40px;
  margin-top: 15px;
  color: #eeeff4;
  font-weight: 500;
  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-head {
    padding: 10px 16px;
    display: grid;
    column-gap: 10px;
    align-items: center;
    border-bottom: 1px solid #999;
    &__name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
</style>
