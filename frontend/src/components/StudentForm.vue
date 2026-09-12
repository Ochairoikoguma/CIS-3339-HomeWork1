<script setup>
import { ref } from 'vue';
import { useStudentStore } from '../stores/students';

const store = useStudentStore();
const name = ref('');
const studentId = ref('');
const phone = ref('');
const zip = ref('');
const errorMsg = ref('');
const successMsg = ref('');

async function handleSubmit() {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await store.addStudent({
      name: name.value,
      studentId: studentId.value,
      phone: phone.value,
      zip: zip.value,
    });
    successMsg.value = 'Student added successfully.';
    name.value = '';
    studentId.value = '';
    phone.value = '';
    zip.value = '';
  } catch (err) {
    errorMsg.value = err.response?.data?.error || 'Failed to add student.';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Add a Student</h2>
    <label for="name">Name</label>
    <input id="name" v-model="name" required />

    <label for="studentId">Student ID</label>
    <input id="studentId" v-model="studentId" required />

    <label for="phone">Phone</label>
    <input id="phone" v-model="phone" required />

    <label for="zip">ZIP Code</label>
    <input id="zip" v-model="zip" required />

    <button type="submit">Add Student</button>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <p v-if="successMsg" class="success">{{ successMsg }}</p>
  </form>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; margin-bottom: 2rem; }
.error { color: #b91c1c; }
.success { color: #15803d; }
</style>