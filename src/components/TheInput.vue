<script setup>
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: Array,
    required: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "100%",
  },
});

const emit = defineEmits(["update:value"]);
const updateValue = (e) => {
  emit("update:value", e.target.value);
};
</script>

<template>
  <div class="wrapper-input" :style="{ width: width }">
    <input
      class="input-text"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      />
    <label class="input-label" :for="name">{{ label }}</label>
    <TransitionGroup>
      <div class="wrapper-error" v-for="element of error" :key="element.$uid">
        <div class="wrapper-error__message">{{ element.$message }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &-input {
    margin-bottom: 30px;
    position: relative;
  }
  &-error {
    width: 102%;
    background: #f93e5a;
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #f2f2f2;
    padding: 5px;
  }
}
.input {
  &-text {
    border: 1px solid #0084f4;
    padding: 0 10px;
    height: 42px;
    border-radius: 7px;
    background-color: #444;
    color: #f2f2f2;
    font-size: 15px;
    width: 100%;
    position: relative;
    z-index: 1;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
    font-size: 13px;
    color: #0084f4;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
