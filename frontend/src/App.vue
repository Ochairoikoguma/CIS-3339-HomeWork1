<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <main class="container">
    <RouterView />
  </main>
</template>

<style>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>