<template>
  <fragment>
    <top-bar />
    <v-content>
      <router-view />
    </v-content>
  </fragment>
</template>

<script>
  import { mapActions } from "vuex";
  import TopBar from "@/components/home/TopBar.vue";
  import { Fragment } from "vue-fragment";
  export default {
    name: "home",
    components: {
      TopBar,
      Fragment,
    },
    created() {
      this.resetGame();
      this.resetCourse();
    },
    methods: {
      ...mapActions(["resetGame", "resetCourse"]),
    },
  };
</script>
