import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/axios';

export const useCourseStore = defineStore('courses', () => {
  const courses = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCourses() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get('/courses');
      courses.value = res.data;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to load courses';
    } finally {
      loading.value = false;
    }
  }

  async function addCourse(course) {
    const res = await api.post('/courses', course);
    courses.value.push(res.data);
    return res.data;
  }

  async function deleteCourse(id) {
    await api.delete(`/courses/${id}`);
    courses.value = courses.value.filter((c) => c._id !== id);
  }

  return { courses, loading, error, fetchCourses, addCourse, deleteCourse };
});