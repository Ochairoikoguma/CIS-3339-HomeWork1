import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/axios';

export const useStudentStore = defineStore('students', () => {
  const students = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchStudents(name = '') {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get('/students', { params: { name } });
      students.value = res.data;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to load students';
    } finally {
      loading.value = false;
    }
  }

  async function addStudent(student) {
    const res = await api.post('/students', student);
    students.value.push(res.data);
    return res.data;
  }

  async function deleteStudent(id) {
    await api.delete(`/students/${id}`);
    students.value = students.value.filter((s) => s._id !== id);
  }

  return { students, loading, error, fetchStudents, addStudent, deleteStudent };
});