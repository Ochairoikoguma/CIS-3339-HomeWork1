<script setup>
import { ref, onMounted } from 'vue';
import { useStudentStore } from '../stores/students';
import StudentForm from '../components/StudentForm.vue';
import StudentTable from '../components/StudentTable.vue';

const store = useStudentStore();
const searchName = ref('');

onMounted(() => store.fetchStudents());

function handleSearch() {
  store.fetchStudents(searchName.value);
}
</script>

<template>
  <h1>Students</h1>

  <form @submit.prevent="handleSearch" class="search">
    <label for="search">Search by name</label>
    <input id="search" v-model="searchName" placeholder="e.g. John" />
    <button type="submit">Search</button>
    <button type="button" @click="searchName = ''; store.fetchStudents()">Clear</button>
  </form>

  <StudentForm />
  <StudentTable />
</template>

<style scoped>
.search { display: flex; gap: 0.5rem; align-items: end; margin-bottom: 1.5rem; }
</style>