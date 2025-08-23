<template>
  <div>
    <div class="tags has-addons">
      <span 
        class="tag is-success"
      >Connected</span>
      <span
        class="tag has-background-grey-lighter has-text-primary connectBtn"
        @click="reconnect()"
        title="Reconnect"
      >
        <span class="icon is-small">
          <i class="fas fa-undo"></i>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const reconnect = () => {
  // For now just log, would implement reconnect logic in production
  console.log('Reconnecting...')
}
</script>

<style scoped>
.connectBtn {
  cursor: pointer;
}
</style>
