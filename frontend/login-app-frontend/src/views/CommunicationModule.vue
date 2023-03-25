<!-- <template>
  <div class="main-container">
    <input type="radio" id="sms" value="sms" v-model="selectedOption" />
    <label for="sms">SMS</label>
    <br />
    <input
      type="radio"
      id="whatsapp"
      value="whatsapp"
      v-model="selectedOption"
    />
    <label for="whatsapp">WhatsApp</label>
    <br />

    <label for="to">To:</label>
    <input type="text" v-model="to" id="to" />
    <br />
    <label for="body">Message:</label>
    <textarea v-model="body" id="body"></textarea>
    <br />
    <button class="btn btn-secondary" @click="send">Send</button>
    <button class="btn btn-warning ml-4" @click="cancel">Cancel</button>
  </div>
</template> -->
<template>
  <div class="message-form">
    <div class="w-50">
      <div class="d-flex flex-row mt-5 sub-container">
        <input type="radio" id="sms" value="sms" v-model="selectedOption" />
        <label class="mt-1 ml-1" for="sms">SMS</label>
        <br />
        <input
          type="radio"
          id="whatsapp"
          value="whatsapp"
          v-model="selectedOption"
          class="ml-3"
        />
        <label class="mt-1 ml-1" for="whatsapp">WhatsApp</label>
        <br />
      </div>
      <div class="d-flex flex-row justify-content-center ml-4">
        <label for="to">To:</label>
        <input
          class="text-area"
          type="text"
          placeholder="Phone number"
          v-model="to"
          id="to"
        />
      </div>

      <div class="d-flex flex-row justify-content-center mr-5">
        <label for="body">Message:</label>
        <textarea
          class="text-area"
          v-model="body"
          id="body"
          rows="4"
          cols="60"
          placeholder="Write your message here.."
        ></textarea>
      </div>
      <button class="btn btn-primary" @click="send">Send</button>
      <button class="btn btn-danger ml-3" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { toaster } from '@meforma/vue-toaster';

export default {
  data() {
    return {
      counter: 0,
      selectedOption: 'sms', // default selected option
      // from: '',
      to: '',
      body: '',
    };
  },
  methods: {
    toast(toaster, append = false) {
      this.counter++;
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append,
      });
    },
    async send() {
      try {
        let response = null;
        if (this.selectedOption === 'sms') {
          response = await axios.post('http://localhost:3000/auth/send-sms', {
            to: this.to,
            body: this.body,
          });
        } else if (this.selectedOption === 'whatsapp') {
          response = await axios.post(
            'http://localhost:3000/auth/send-whatsapp-message',
            {
              to: this.to,
              message: this.body,
            },
          );
        }
        console.log(response);
        this.$toast.success(`Message sent successfully`); // show success message
      } catch (error) {
        console.error(error);
        this.$toast.error(`Failed to send`);
      }
    },
    cancel() {
      this.to = '';
      this.body = '';
    },
  },
};
</script>

<style>
.message-form {
  background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-lg-bg.png');
  background-size: cover;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  padding: 10px;
}

.sub-container {
  margin-left: 340px;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 25px;
}

input[type='text'],
textarea {
  width: 30%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  margin-left: 10px;
}

.text-area {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
}

button:hover {
  background-color: #005fa3;
}
</style>
