<template>
  <v-content>
    <v-card max-width="400" class="mx-auto">
      <v-card-title>STATS</v-card-title>
    </v-card>
    <div class="about">
      <p>Courses are: {{ courses }}</p>
      <button class="btn btn-primary" @click="fetchCourseList">fetchCourses</button>
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Get single Course..." />
        <input type="submit" value="Submit" />
      </form>
      <p>currentCourse is: {{ singleCourse }}</p>
    </div>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "stats",
    computed: {
      ...mapGetters(["getSignedIn", "getCourses", "getCurrentCourse"]),
      courses() {
        return this.getCourses;
      },
      singleCourse() {
        return this.getCurrentCourse;
      },
    },

    methods: {
      ...mapActions(["fetchCourseList", "fetchCourse"]),
      onSubmit(e) {
        e.preventDefault();
        this.fetchCourse(this.title);
      },
    },
    data() {
      return {
        title: "",
      };
    },
  };
</script>
