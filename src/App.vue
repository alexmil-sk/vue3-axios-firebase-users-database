<template>
  <div class="container">
    <app-alert :alert="alert" @action="alert = null"> </app-alert>

    <form class="card">
      <h1>Users database in Firebase (Realtime Database)</h1>

      <div class="form-control">
        <app-input
          type="text"
          id="userFirstName"
          placeholder="Come up with a user's name"
          v-model.trim="userFirstName"
          >Enter user's name
        </app-input>
      </div>

      <app-input
        placeholder="Come up with a user surname"
        type="text"
        v-model.trim="userSecondName"
        >Enter user's surname
      </app-input>

      <app-input
        placeholder="Come up with a user's age"
        type="number"
        v-model.number="userAge"
        >Enter user's age
      </app-input>

      <app-input
        placeholder="Come up with a user's position"
        type="text"
        v-model.trim="userPosition"
        >Enter user's position</app-input
      >
      <app-input
        placeholder="Come up with a user's department"
        type="text"
        v-model.trim="userDepartment"
        >Enter user's department
      </app-input>

      <app-button
        color="primary"
        @action="submitUser"
        :disabled="!userFirstName"
        >Add User To Firebase
      </app-button>
      <app-button @action="getUsers" color="warning"
        >Get Users From Firebase</app-button
      >
    </form>

    <AppLoader v-if="isLoading" />

    <app-users-list :users="users" @delUser="delUser" v-else></app-users-list>
  </div>
</template>

<script>
import axios from "axios";
import AppUsersList from "./components/AppUsersList.vue";
import AppInput from "./components/AppInput.vue";

export default {
  name: "App",
  components: { AppUsersList, AppInput },
  data() {
    return {
      userFirstName: "",
      userSecondName: "",
      userAge: 20,
      userPosition: "",
      userDepartment: "",
      users: [],
      alert: null,
      isLoading: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async submitUser() {
      const existingUser = this.users.find(
        (item) => item.name === this.userFirstName
      );

      if (existingUser) {
        setTimeout(() => {
          this.alert = null;
        }, 1500);

        return (this.alert = {
          type: "danger",
          title: "ERROR!",
          text: "ERROR! User already exist!",
        });
      }

      await axios
        .post(
          "https://vue-ls8-minin-default-rtdb.europe-west1.firebasedatabase.app/users.json",
          {
            name: this.userFirstName,
            surname: this.userSecondName,
            age: this.userAge,
						position: this.userPosition,
						department: this.userDepartment
          }
        )
        .then((res) => {
          this.users.unshift({
            id: res.data.name,
            name: this.userFirstName,
            surname: this.userSecondName,
            age: this.userAge,
						position: this.userPosition,
						department: this.userDepartment
          });
          this.alert = {
            type: "info",
            title: "OK!",
            text: `User "${this.userFirstName}" have been created...`,
          };
        })
        .catch((err) => {
          this.alert = {
            type: "danger",
            title: "ERROR!",
            text: err.message,
          };
        });

      //await fetch(
      //  "https://vue-ls8-minin-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      //  {
      //    method: "POST",
      //    headers: {
      //      "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify({
      //      firstName: this.username,
      //    }),
      //  }
      //);

      this.userFirstName = "";

      setTimeout(() => {
        this.alert = null;
      }, 1500);
    },
    getUsers() {
      this.isLoading = true;
      setTimeout(async () => {
        try {
          const res = await axios.get(
            "https://vue-ls8-minin-default-rtdb.europe-west1.firebasedatabase.app/users.json"
          );

          if (!res.data) {
            this.isLoading = false;
            throw new Error("No users in database!");
          }

          this.users = Object.keys(res.data).map((key) => {
            return {
              id: key,
              //name: res.data[key].firstName
              ...res.data[key],
            };
          });

          this.isLoading = false;

          this.alert = {
            type: "primary",
            title: "OK! Request completed!",
            text: "All users have been loaded...",
          };
        } catch (err) {
          this.alert = {
            type: "danger",
            title: "ERROR!",
            text: err.message,
          };
        }
      }, 1500);

      setTimeout(() => {
        this.alert = null;
      }, 3000);
    },
    async delUser(id) {
      try {
        const findUser = this.users.find((item) => item.id === id);

        await axios.delete(
          `https://vue-ls8-minin-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
        );

        this.users = this.users.filter((item) => item.id !== id);

        this.alert = {
          type: "warning",
          title: "OK!",
          text: `User "${findUser.name}"  have been deleted`,
        };
      } catch (err) {
        this.alert = {
          type: "warning",
          title: "ERROR",
          text: err.message,
        };
      }

      setTimeout(() => {
        this.alert = null;
      }, 1500);
    },
  },
};
</script>

<style scoped lang="css">
</style>
