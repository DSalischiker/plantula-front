<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <h1 class="title has-text-centered">
            Profile
          </h1>
          <!-- User Profile Form -->
          <form v-if="user" @submit.prevent="updateProfile">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  :placeholder="user.email"
                  v-model="userData.email"
                  class="input"
                  type="email"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="userData.password"
                  class="input"
                  type="password"
                />
              </div>
            </div>

            <div class="field has-text-right">
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                  :disabled="!hasDataChanged"
                  :class="{ 'is-loading': isLoading }"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
          <!-- End of User Profile Form -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      userData: {
        email: this.email,
        password: "",
      }
    };
  },
  methods: {
    async updateProfile() {
      this.isLoading = true;
      /* try {
        await this.$store.dispatch("user/updateProfile", {
          email: this.userData.email,
          password: this.userData.password,
        });
        this.$toast.success("Account data updated");
        this.userData.email = this.userData.password = "";
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      } */
    }
  },
  computed: {
    ...mapState("user", ["user"]),
    email() {
      return this.$store.getters.email;
    },
    hasDataChanged() {
      return (
      // Email exists and is different
      this.userData.email && this.userData.email !== this.user.email ||
      // Password exists and is different
      this.userData.password.length
      );
    }
  }
}
</script>

<style>

</style>