<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <template v-if="action === 'login'">
            <h1 class="title has-text-centered">Ingreso</h1>
            <!-- Login Form -->
            <form @submit.prevent="doLogin">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="userData.email"
                    class="input"
                    type="email"
                    placeholder="e.g. emilioravenna@gmail.com"
                    required
                  >
                </div>
              </div>

              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control">
                  <input
                    v-model="userData.password"
                    class="input"
                    type="password"
                    required
                  >
                </div>
              </div>

              <div class="field has-text-right">
                <div class="control">
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isLoading }"
                  >
                    <strong>Ingresar</strong>
                  </button>
                </div>
              </div>
              <a class="is-block" @click="action = 'register'">¿No tenés una cuenta? Registrate</a>
              <a class="is-block" @click="action = 'reset'">¿Olvidaste tu contraseña?</a>
            </form>
          </template>
          <!-- End Login Form -->

          <!-- Register Form -->
          <template v-if="action === 'register'">
            <h1 class="title has-text-centered">
              Registro
            </h1>
            <form @submit.prevent="doRegister">
              <!-- <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    v-model="userData.username"
                    class="input"
                    type="text"
                    placeholder="ej: diegolas777"
                    required
                  >
                </div>
              </div> -->

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="userData.email"
                    class="input"
                    type="email"
                    placeholder="ej: mariosantos@gmail.com"
                    required
                  >
                </div>
              </div>

              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control">
                  <input
                    v-model="userData.password"
                    class="input"
                    type="password"
                    required
                  >
                </div>
              </div>

              <!-- <div class="field">
                <label class="label">Teléfono</label>
                <div class="control">
                  <input
                    v-model="userData.phone"
                    class="input"
                    type="text"
                    placeholder="ej: 1122334455"
                    required
                  >
                </div>
              </div> -->

             <!--  <b-field
                label="Barrio">
                <b-select
                  v-model="userData.neighbourhood"
                  placeholder="Seleccioná tu barrio"
                  expanded
                  required
                >
                  <option value="Villa Crespo">Villa Crespo</option>
                  <option value="Almagro">Almagro</option>
                  <option value="Caballito">Caballito</option>
                  <option value="Paternal">Paternal</option>
                </b-select>
              </b-field> -->

              <div class="field has-text-right">
                <div class="control">
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isLoading }"
                  >
                    <strong>Registrar</strong>
                  </button>
                </div>
              </div>
              <a @click="action = 'login'">¿Ya tenés una cuenta? Ingresá</a>
            </form>
          </template>
          <!-- End Register Form -->

          <!-- Password reset email -->
          <template v-if="action === 'reset'">
            <h1 class="title has-text-centered">Cambiar contraseña</h1>
            <form @submit.prevent="doReset">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="userData.email"
                    class="input"
                    type="email"
                    placeholder="e.g. alexsmith@gmail.com"
                    required
                  >
                </div>
              </div>

              <div class="field has-text-right">
                <div class="control">
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isLoading }"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <a @click="action = 'login'">¿Ya tenés una cuenta? Ingresá</a>
            </form>
          </template>
          <!-- End of password reset email -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "AuthView",
  data() {
    return {
      action: 'login',
      isLoading: false,
      userData: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    redirect() {
      this.$router.push({ name: "home" });
    },
    resetData() {
      this.userData.email = this.userData.password = "";
    },
    async doRegister() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("user/doRegister", {
          email: this.userData.email,
          password: this.userData.password,
        });
        this.$toast.success("Cuenta Creada");
        this.doLogin();
        this.resetData();
        this.redirect();
      } catch (error) {
        this.$toast.error(error.message);
        console.error(error.message)
      } finally {
        this.isLoading = false;
      }
    },
    async doLogin() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("user/doLogin", {
          email: this.userData.email,
          password: this.userData.password,
        });
        this.$toast.success("Logged in");
        this.resetData();
        this.redirect();
      } catch (error) {
        this.$toast.error(error.message);
        console.error(error.message)
      } finally {
        this.isLoading = false;
      }
    },
    async doReset() {
      this.isLoading = true;
      /* try {
        await this.$store.dispatch("user/doReset", this.userData.email);
        this.$toast.success(`Please check ${this.userData.email} for further instructions.`);
        this.resetData();
      } catch (error) {
        this.$toast.error(error.message);
        console.error(error.message)
      } finally {
        this.isLoading = false;
      } */
    }
  }
}
</script>