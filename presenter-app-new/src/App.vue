<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Main App component with router view
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fafafa;
  color: #333;
}

#app {
  min-height: 100vh;
}

/* Global color variables matching original design */
:root {
  --primary: #1B1464;
  --secondary: #2E3192;
  --danger: #F02B5C;
  --success: #22D56D;
  --highlight: #97F2F1;
  --lightblue: #B8C5E8;
  --lightblue-darker: #A3B3E3;
}
</style>
