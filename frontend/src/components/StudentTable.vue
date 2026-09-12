<script setup>
import { useStudentStore } from '../stores/students';

const store = useStudentStore();

async function handleDelete(id) {
  if (!confirm('Delete this student?')) return;
  await store.deleteStudent(id);
}
</script>

<template>
  <div>
    <p v-if="store.loading">Loading students...</p>
    <p v-else-if="store.error" class="error">{{ store.error }}</p>
    <p v-else-if="store.students.length === 0">No students found.</p>

    <table v-else border="1">
      <thead>
        <tr>
          <th>Name</th><th>Student ID</th><th>Phone</th><th>ZIP</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in store.students" :key="s._id">
          <td>{{ s.name }}</td>
          <td>{{ s.studentId }}</td>
          <td>{{ s.phone }}</td>
          <td>{{ s.zip }}</td>
          <td><button @click="handleDelete(s._id)">Delete</button></td>
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