<template>
  <div class="main">
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="header">{{ user.email }}</td>
            <td>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="showModalPop(user)"
              >
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button
                class="btn btn-outline-danger btn-sm ml-2"
                @click="deleteUser(user.id)"
              >
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      :class="{ 'd-block': showModal }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User Email</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="editedUser.email"
              class="form-control"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" @click="updateUser">
              Save changes
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="hideModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-secondary" @click="clearAll()">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';
// import mongoose from 'mongoose';

export default {
  data() {
    return {
      users: [],
      showModal: false,
      editedUser: {
        id: null,
        email: '',
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://localhost:3000/auth/', config);
        this.users = response.data;
      } catch (error) {
        this.$router.push('/login');
      }
    },
    clearAll() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    showModalPop(user) {
      console.log(user.id);
      this.editedUser.id = user.id;
      this.editedUser.email = user.email;
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    async updateUser() {
      const id = this.editedUser.id;

      try {
        const token = localStorage.getItem('token');
        console.log(token, 'tok');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put(
          `http://localhost:3000/auth/${id}`,
          { email: this.editedUser.email },
          config,
        );
        console.log(response.data);
        this.showModal = false;
        // Update the local user object with the updated email
        this.fetchData();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(id) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.delete(
          `http://localhost:3000/auth/${id}`,
          config,
        );
        console.log(response.data);
        alert('user deleted successfully');
        this.fetchData();
        // Remove the deleted user from the local users array
        // this.users = this.users.filter(user => user.id !== id);
      } catch (error) {
        console.error(error);
        alert('user deleted successfully');
      }
    },
  },
};
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.min.css';

.icon {
  cursor: pointer;
}
.main {
  background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-lg-bg.png');
  background-size: cover;
  height: 85vh;
  width: 100vw;
}

.header {
  font-family: Verdana, sans-serif;
}
</style>
