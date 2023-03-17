<template>
  <div class="main mb-5">
    <div class="container mt-5 mb-5">
      <h1 class="text-center mb-5 mt-5">Sign up</h1>
      <form @submit.prevent="submitForm" class="rounded form-shadow">
        <div class="form-group mt-2">
          <label class="float-left">Email:</label>
          <input
            class="form-control"
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group mt-4">
          <label class="float-left">Password:</label>
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <button class="btn btn-danger" type="submit">Sign up</button>
        <div class="d-flex flex-column justify-content-center">
          <router-link class="text-white mt-3" to="/login"
            >Already have an account? LOGIN</router-link
          >
        </div>
      </form>
    </div>
  </div>
  <!-- <form @submit.prevent="submitForm">
    <div class="d-flex flex-column justify-content-center align-center mt-5">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label class="mr-4">
        Password:
        <input type="password" v-model="password" required />
      </label>
    </div>

    <button class="btn btn-primary" type="submit">Sign up</button>
  </form> -->
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
          email: this.email,
          password: this.password,
        });
        const token = response.data;
        console.log(token);
        // Clear the form fields
        this.email = '';
        this.password = '';
        // Redirect to the login page
        this.$router.push('/login');
        alert('Signup sucessfull please login to continue!');
      } catch (error) {
        alert(error.response.data.message);
        // Handle any errors here (e.g., display an error message)
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.float-left {
  float: left;
  margin-right: 10px; /* optional, adds some space between label and input */
}

.main {
  background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-lg-bg.png');
  background-size: cover;
  height: 85vh;
  width: 100vw;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

input[type='email'],
input[type='password'] {
  width: 100%;
}

button[type='submit'] {
  margin-top: 1rem;
}

/* .center {
  display: flex;
  justify-content: center;
} */

.text-center {
  text-align: center;
}

.form-shadow {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
  background: linear-gradient(to right, rgb(49, 45, 45), rgb(178, 14, 14));
  padding: 20px;
  color: #fff;
  height: 50vh;
}
</style>
