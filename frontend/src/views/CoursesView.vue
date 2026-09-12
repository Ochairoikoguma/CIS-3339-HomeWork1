<script setup>
import { onMounted } from 'vue';
import { useCourseStore } from '../stores/courses';
import CourseForm from '../components/CourseForm.vue';
import CourseTable from '../components/CourseTable.vue';

const store = useCourseStore();
onMounted(() => store.fetchCourses());
</script>

<template>
  <h1>Courses</h1>
  <CourseForm />
  <CourseTable />
</template>