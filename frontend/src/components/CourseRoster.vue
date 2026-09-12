<script setup>
import { ref } from 'vue';
import { useCourseStore } from '../stores/courses';
import { useEnrollmentStore } from '../stores/enrollments';

const courseStore = useCourseStore();
const enrollmentStore = useEnrollmentStore();
const selectedCourse = ref('');

function handleSelect() {
  if (selectedCourse.value) enrollmentStore.fetchRoster(selectedCourse.value);
}
</script>

<template>
  <div>
    <h2>View Course Roster</h2>
    <label for="rosterCourse">Course</label>
    <select id="rosterCourse" v-model="selectedCourse" @change="handleSelect">
      <option disabled value="">Select a course</option>
      <option v-for="c in courseStore.courses" :key="c._id" :value="c._id">
        {{ c.courseId }} - {{ c.name }}
      </option>
    </select>

    <p v-if="enrollmentStore.loading">Loading roster...</p>
    <p v-else-if="enrollmentStore.error" class="error">{{ enrollmentStore.error }}</p>
    <p v-else-if="selectedCourse && enrollmentStore.roster.length === 0">No students enrolled.</p>

    <ul v-else>
      <li v-for="e in enrollmentStore.roster" :key="e._id">
        {{ e.student.name }} ({{ e.student.studentId }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.error { color: #b91c1c; }
</style>