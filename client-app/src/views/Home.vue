<template>
  <div class="home">
    <SessionConnect />
  </div>
</template>

<script>
import SessionConnect from '@/components/SessionConnect.vue'

export default {
  name: 'Home',
  components: {
    SessionConnect
  }
}
</script>
