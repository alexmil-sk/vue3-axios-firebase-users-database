<template>
  <div v-if="users.length" class="flex">
    <div v-for="user in users" :key="user.id" class="card center">
      <div>
        <h3>User`s <span class="username">{{ user.name }}</span> Data</h3>
        <hr />
        <p>
          ID: <b>{{ user.id }}</b>
          <br />
          Name: <b>{{ user.name }}</b>
          <br />
          Surname: <b>{{ user.surname }}</b>
          <br />
          Age: <b>{{ user.age }}</b>
          <br />
          Position: <b>{{ user.position }}</b>
          <br />
          Department: <b>{{ user.department }}</b>
        </p>
      </div>

      <hr />

      <div class="del-btn">
        <app-button
					@action="$emit('delUser', user.id)"
					color="danger"
					class="del-btn__text"
          >Delete</app-button
        >
      </div>
    </div>
  </div>

  <div v-else class="card empty">
    <h3>The list of users is empty ...</h3>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  emits: ["delUser"],
};
</script>

<style lang="css" scoped>
.flex {
  display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.card.center {
  width: 250px;
  display: flex;
  margin: 15px;
  justify-content: space-between;
	border: 1px solid crimson;
  box-shadow: 0 0  10px 10px rgba(255, 255, 255, 0.9);
}

.username {
	display: inline-block;
	background: gray;
	color: white;
	padding: 2px 10px;
	border: 1px solid gray;
	border-radius: 20px;
}

.card.empty {
  margin: 15px;
	border: 1px solid gray;
  box-shadow: 0 0  10px 10px rgba(255, 255, 255, 0.9);
	background: #c6c6c6;
}

.del-btn {
  margin: 10px 0;
}

.del-btn__text {
	font-size: 1rem;
}
</style>