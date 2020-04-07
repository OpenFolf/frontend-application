<template>
  <div>
    <h2>Course name {{ courseName }}</h2>
  </div>
</template>

<script>
  export default {
    name: "scorecard",

    data() {
      return {
        courseName: "Folf völlurinn sprell",
        currentUserName: "Siggi Hall",
        joinedUsers: [
          {
            userId: 1,
            userName: "Skari Skrípó",
          },
          {
            userId: 2,
            userName: "Siggi Hall",
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped></style>
