<template>
  <v-col cols="12">
    <v-card :color="content.color">
      <v-card-title class="headline"> {{ content.title }} </v-card-title>
      <v-card-subtitle> {{ content.subtitle }} </v-card-subtitle>
      <v-card-actions>
        <v-btn text>{{ content.buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "home-list-item",
    props: {
      content: {
        type: Object,
        required: true,
      },
    },
  };
</script>
