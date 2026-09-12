<script setup>
import { useCourseStore } from '../stores/courses';

const store = useCourseStore();

async function handleDelete(id) {
  if (!confirm('Delete this course? This will also remove its enrollments.')) return;
  await store.deleteCourse(id);
}
</script>

<template>
  <div>
    <p v-if="store.loading">Loading courses...</p>
    <p v-else-if="store.error" class="error">{{ store.error }}</p>
    <p v-else-if="store.courses.length === 0">No courses found.</p>

    <table v-else border="1">
      <thead>
        <tr><th>Course ID</th><th>Name</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in store.courses" :key="c._id">
          <td>{{ c.courseId }}</td>
          <td>{{ c.name }}</td>
          <td><button @click="handleDelete(c._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.error { color: #b91c1c; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5rem; text-align: left; }
</style>