import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/axios';

export const useEnrollmentStore = defineStore('enrollments', () => {
  const roster = ref([]); // students enrolled in the currently selected course
  const loading = ref(false);
  const error = ref(null);

  async function enroll(studentId, courseId) {
    const res = await api.post('/enrollments', { studentId, courseId });
    return res.data;
  }

  async function fetchRoster(courseId) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get(`/enrollments/course/${courseId}`);
      roster.value = res.data;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to load roster';
    } finally {
      loading.value = false;
    }
  }

  return { roster, loading, error, enroll, fetchRoster };
});