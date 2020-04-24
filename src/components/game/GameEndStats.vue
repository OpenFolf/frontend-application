<template>
  <div>
    <h1>Game end stats</h1>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "game-end-stats",
    created() {
      this.bottomNavHandler(true);
    },
    methods: {
      ...mapActions(["showBottomNav"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
  };
</script>
<style lang="sass" scoped></style>
