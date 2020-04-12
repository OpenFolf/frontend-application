<template>
  <v-content>
    <v-card max-width="400" class="mx-auto">
      <v-card-title>STATS</v-card-title>
    </v-card>
    <v-card max-width="400" class="mx-auto" color="#F44336">
      <v-card-title>Course</v-card-title>
      <div>
        <h4>To fetch a list of all the courses in the database click fetch courses button</h4>
        <p>
          The list of courses will be uploaded into state as the array courses, and looks like this:
        </p>
        <p>{{ courses }}</p>
        <v-btn color="#FFCDD2" @click="fetchCourseList">fetchCourses</v-btn>
        <v-form @submit="fetchCourseButton">
          <p>
            Enter courseid for a single course and press fetchSingleCourseButton. The object for the
            single cours will be uploaded to the store as an object named currentCourse
          </p>
          <input type="text" v-model="title" placeholder="Enter Course id..." />
          <input type="submit" value="fetchsingleCourseButton" />
        </v-form>
        <h4>currentCourse is:</h4>
        <p>{{ singleCourse }}</p>
      </div>
    </v-card>
    <v-card max-width="400" class="mx-auto" color="#9C27B0">
      <v-card-title>Game</v-card-title>
      <!-- <div class="about">
        <p>To fetch courses click fetch courses button: {{ courses }}</p>
        <button class="btn btn-primary" @click="fetchCourseList">fetchCourses</button>
        <form @submit="onSubmit">
            <input type="text" v-model="title" placeholder="Enter Course id..." />
            <input type="submit" value="fetchCourse" />
        </form>
        <p>currentCourse is: {{ singleCourse }}</p>
        </div> -->
    </v-card>
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
      fetchCourseButton(e) {
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
