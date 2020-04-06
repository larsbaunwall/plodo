<template>
  <div
    id="app"
    class="container-fluid h-100"
  >
    <div class="row"><router-view /></div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <img
          src="@/assets/artwork/logo.png"
          width="50px"
          style="margin-top: 10px;"
          id="logo"
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#app {
  height: 100%;
}

#logo:hover {
  filter: grayscale(0%);
}

#logo {
  filter: saturate(0%) contrast(0%) brightness(150%);
}
</style>
