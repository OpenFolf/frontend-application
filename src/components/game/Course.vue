<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <h1>{{ path }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "game-course",
    props: {
      path: {
        type: String,
        required: true,
      },
    },
  };
</script>
