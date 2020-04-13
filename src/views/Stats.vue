<template>
  <!-- <v-content>
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
            single course will be uploaded to the store as an object named currentCourse [CID test]
          </p>
          <input type="text" v-model="title" placeholder="Enter Course id..." />
          <input type="submit" value="fetchsingleCourseButton" />
        </v-form>
        <h4>currentCourse is:</h4>
        <p>{{ singleCourse }}</p>
        <p v-if="singleCourse">
          Daemi um ad na i single element ur object-inu: {{ singleCourse.getCourse.id }}
        </p>
      </div>
    </v-card>
    <v-card max-width="400" class="mx-auto" color="#9C27B0">
      <v-card-title>Game</v-card-title>
      Setja inn create Game
      get currentGame
      subscription a Game
    </v-card>
    <v-card max-width="400" class="mx-auto" color="#9C27B0">
      <v-card-title>User</v-card-title>
      Setja inn edit user Game
      Hvad fleira?
    </v-card>
    <v-card max-width="400" class="mx-auto" color="#9C27B0">
      <v-card-title>Player</v-card-title>
      Setja inn edit user Game
      Hvad fleira?
    </v-card>
  </v-content> -->
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card color="success" class="pa-1 overflow-x-auto">
            <v-card-title>Fetch Courses</v-card-title>
            <v-card-text class="d-flex flex-row font-weight-bold">
              The list of courses will be uploaded into <strong>STATE</strong> as the array courses,
              and looks like this:
            </v-card-text>
            <v-card max-width="600px">
              <v-btn
                x-large
                block
                :disabled="pushed"
                class="my-3"
                color="info"
                @click="fetchCoursesHandler"
              >
                fetch Courses
              </v-btn>
            </v-card>
            <v-divider />
            <pre class="mb-5">{{ courses }}</pre>
          </v-card>
          <v-card color="info" class="pa-1 overflow-x-auto">
            <v-card-title>Get Single Course by Courses ID</v-card-title>
            <v-card max-width="600px" class="mt-5 pt-3">
              <v-card-text>
                Enter <strong>'courseid'</strong> for a single course and press
                fetchSingleCourseButton. The object for the single course will be uploaded to the
                store as an object named currentCourse [CID test]
              </v-card-text>
              <v-text-field
                outlined
                clearable
                clear-icon="fa-times-circle"
                flat
                solo
                v-model="courseId"
                label="Course ID"
                @keyup.enter="fetchSingleHandler"
                class="mx-1"
              />
              <v-btn x-large block color="error" @click="fetchSingleHandler">
                <v-icon>fa-cloud-download-alt</v-icon>
              </v-btn>
            </v-card>
            <v-card-title>currentCourse is:</v-card-title>
            <v-divider />
            <template v-if="singleCourse">
              <v-alert dense type="success" class="">
                Daemi um ad na i single element ur object-inu:
                <strong>{{ singleCourse.getCourse.id }}</strong>
              </v-alert>
            </template>
            <pre>{{ singleCourse }}</pre>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      fetchSingleHandler() {
        this.fetchCourse(this.courseId);
        this.courseId = "";
      },
      fetchCoursesHandler() {
        this.fetchCourseList();
        this.pushed = true;
      },
    },
    data() {
      return {
        courseId: "",
        pushed: false,
      };
    },
  };
</script>
