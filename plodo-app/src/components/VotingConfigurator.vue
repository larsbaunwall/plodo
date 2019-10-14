<template>
  <div>
      <base-dropdown>      
        <base-button slot="title" type="default" class="dropdown-toggle">
            <img src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/US.png" /> Flags
        </base-button>
        <li v-for="opt in options" :key="opt.name">
            <a class="dropdown-item" href="#">
                <img src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/DE.png" /> {{opt.name}}
            </a>
        </li>
      </base-dropdown>
    <base-button outline type="primary">+</base-button>
  </div>
</template>

<script>
export default {
    name: "VotingConfigurator",
    components: {
        },
    data: {
        options: [
            {icon: "", name: "Like"},
            {icon: "", name: "Dislike"},
            {icon: "", name: "Yay"},
            {icon: "", name: "Nay"},
            {icon: "", name: "Break"}
        ]
    }
}
</script>

<style>

</style>