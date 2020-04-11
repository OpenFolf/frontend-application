// Queries for course object

export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      holeCount
      holes {
        items {
          no
          redLength
          whiteLength
          blueLength
          yellowLength
          redPar
          whitePar
          bluePar
          yellowPar
          holePhoto
        }
      }
      teetype
      baskettype
      description
      latitude
      longitude
      red
      white
      blue
      yellow
      course_photo_url_thumb
      course_photo_url_medium
      userfavorite {
        items {
          user {
            id
            username
            email
          }
        }
      }
    }
  }
`;

export const getCourses = /* GraphQL */ `
  query GetCourses($filter: ModelCourseFilterInput, $limit: Int, $nextToken: String) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        holeCount
        teetype
        baskettype
        description
        latitude
        longitude
        red
        white
        blue
        yellow
        course_photo_url_thumb
        course_photo_url_medium
      }
      nextToken
    }
  }
`;
