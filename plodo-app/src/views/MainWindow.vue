<template>
  <div
    class="mainwindow d-flex flex-row align-items-stretch"
    style="height: 100%;"
  >
    <div style="max-width: 20%">
      <img
        src="https://cdn.qrstuff.com/images/default_qrcode.png"
        width="100%"
        height="100%"
      >
    </div>
    <counter-cell
      type="up"
      count="1244"
    />
    <counter-cell
      type="down"
      count="341"
    />
  </div>
</template>

<script>
import CounterCell from "@/components/CounterCell";
export default {
  components: { CounterCell }
};
</script>

<style>
.mainwindow {min-height: 100%}
</style>
