<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/students">Students</RouterLink>
    <RouterLink to="/courses">Courses</RouterLink>
    <RouterLink to="/enrollments">Enrollments</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background: #1f2937;
}
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}
.navbar a.router-link-active {
  text-decoration: underline;
}
</style>