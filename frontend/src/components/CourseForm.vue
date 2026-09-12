<script setup>
import { ref } from 'vue';
import { useCourseStore } from '../stores/courses';

const store = useCourseStore();
const courseId = ref('');
const name = ref('');
const errorMsg = ref('');
const successMsg = ref('');

async function handleSubmit() {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await store.addCourse({ courseId: courseId.value, name: name.value });
    successMsg.value = 'Course added successfully.';
    courseId.value = '';
    name.value = '';
  } catch (err) {
    errorMsg.value = err.response?.data?.error || 'Failed to add course.';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Add a Course</h2>
    <label for="courseId">Course ID</label>
    <input id="courseId" v-model="courseId" placeholder="e.g. CIS 3339" required />

    <label for="courseName">Course Name</label>
    <input id="courseName" v-model="name" placeholder="e.g. Enterprise Applications Development" required />

    <button type="submit">Add Course</button>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <p v-if="successMsg" class="success">{{ successMsg }}</p>
  </form>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; margin-bottom: 2rem; }
.error { color: #b91c1c; }
.success { color: #15803d; }
</style>