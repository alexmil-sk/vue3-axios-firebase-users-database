<template>
  <button class="btn" :class="color" @click.prevent="$emit('action')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  emits: ["action"],
  props: {
    color: {
			type: String,
			default: '',
      validator(value) {
        return ["", "danger", "info", "primary", "warning"].includes(value);
      },
    },
  },
};
</script>
