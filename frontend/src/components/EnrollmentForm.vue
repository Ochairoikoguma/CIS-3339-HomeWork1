<script setup>
import { ref, onMounted } from 'vue';
import { useStudentStore } from '../stores/students';
import { useCourseStore } from '../stores/courses';
import { useEnrollmentStore } from '../stores/enrollments';

const studentStore = useStudentStore();
const courseStore = useCourseStore();
const enrollmentStore = useEnrollmentStore();

const selectedStudent = ref('');
const selectedCourse = ref('');
const errorMsg = ref('');
const successMsg = ref('');

onMounted(() => {
  if (studentStore.students.length === 0) studentStore.fetchStudents();
  if (courseStore.courses.length === 0) courseStore.fetchCourses();
});

async function handleSubmit() {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await enrollmentStore.enroll(selectedStudent.value, selectedCourse.value);
    successMsg.value = 'Enrollment created successfully.';
  } catch (err) {
    errorMsg.value = err.response?.data?.error || 'Failed to create enrollment.';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Enroll a Student</h2>

    <label for="student">Student</label>
    <select id="student" v-model="selectedStudent" required>
      <option disabled value="">Select a student</option>
      <option v-for="s in studentStore.students" :key="s._id" :value="s._id">
        {{ s.name }} ({{ s.studentId }})
      </option>
    </select>

    <label for="course">Course</label>
    <select id="course" v-model="selectedCourse" required>
      <option disabled value="">Select a course</option>
      <option v-for="c in courseStore.courses" :key="c._id" :value="c._id">
        {{ c.courseId }} - {{ c.name }}
      </option>
    </select>

    <button type="submit">Enroll</button>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <p v-if="successMsg" class="success">{{ successMsg }}</p>
  </form>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; margin-bottom: 2rem; }
.error { color: #b91c1c; }
.success { color: #15803d; }
</style>