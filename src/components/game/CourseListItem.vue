<template>
  <v-col cols="12">
    <v-card color="secondary" ripple :to="{ name: 'game-course', params: { path: content.path } }">
      <v-card-title class="headline mb-3">
        {{ content.name }} - {{ content.distance }} KM
        <v-spacer />
        <v-icon large>fa-angle-right</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-avatar v-if="content.red" class="mx-1" tile size="14" color="red"></v-avatar>
        <v-avatar v-if="content.white" class="mx-1" tile size="14" color="white"></v-avatar>
        <v-avatar v-if="content.blue" class="mx-1" tile size="14" color="blue"></v-avatar>
        <v-avatar v-if="content.yellow" class="mx-1" tile size="14" color="yellow"></v-avatar>
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "course-list-item",
    props: {
      content: {
        type: Object,
        required: true,
      },
    },
  };
</script>
