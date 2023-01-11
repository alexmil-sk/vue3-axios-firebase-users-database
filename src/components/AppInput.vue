<template>
  <div class="form-control">
    <label :for="modelValue">
      <slot />
    </label>
    <input
      :type="type"
      id="modelValue"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
    />
  </div>
</template>

<script>
export default {
  name: "AppInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    placeholder: String,
    type: String,
  },
  methods: {
    change(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="css" scoped>
</style>