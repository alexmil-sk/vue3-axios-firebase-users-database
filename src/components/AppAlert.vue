<template>
  <div class="alert" :class="alert.type" v-if="alert">
    <h3>{{alert.title}}</h3>
		<p>{{alert.text}}</p>
		<app-button
			:color="alert.type"
			@click="$emit('action')"
			>CLOSE</app-button>
  </div>
</template>

<script>
export default {
	name: "AppAlert",
	props: ['alert'],
	emits: ['action'],
};
</script>

<style lang="css" scoped>

</style>