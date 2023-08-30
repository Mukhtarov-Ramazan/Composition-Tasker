<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["closePopUp"]);
const close = () => {
  emit("closePopUp");
};
const wrapper = ref(null)
onMounted(() => {
  document.addEventListener("click", (item) => {
    if (item.target === wrapper.value) {
      emit("closePopUp");
    }
  });
});
</script>

<template>
  <div class="popup-wrapper" ref="wrapper">
    <div class="popup">
      <div class="popup__top">
        <div class="popup__close" @click="close">
          <img src="@/assets/images/close.svg" alt="close" />
        </div>
      </div>

      <div class="popup__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5000;
}

.popup {
  width: 100%;
  max-width: 650px;
  background-color: #2c2c2c;
  border-radius: 20px;
  position: fixed;
  top: 5%;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 30px 35px 50px 35px;

  &__top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 25px;
  }
  &__close {
    width: 28px;
    height: 28px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // &__content {
  //   padding: 0 40px 40px 40px;
  //   text-align: center;
  // }
}
</style>
