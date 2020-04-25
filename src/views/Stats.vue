<template>
  <v-content>
    <v-row dense>
      <user-stats-list />
    </v-row>
  </v-content>
</template>

<script>
  import { mapActions } from "vuex";
  import UserStatsList from "../components/stats/UserStatsList";
  export default {
    name: "stats",
    components: {
      UserStatsList,
    },
    methods: {
      ...mapActions(["fetchUserGameList", "showBottomNav"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
    created() {
      this.fetchUserGameList();
      this.bottomNavHandler(true);
    },
  };
</script>
