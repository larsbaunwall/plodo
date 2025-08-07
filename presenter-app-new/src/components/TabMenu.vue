<template>
  <nav class="tabs">
    <router-link to="/">Start session</router-link>
    <router-link to="/play">Playing</router-link>
    <router-link to="/settings">Settings</router-link>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 12px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}
a {
  text-decoration: none;
}
</style>
