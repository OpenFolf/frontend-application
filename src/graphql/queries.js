/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      games {
        items {
          id
          gameStatus
        }
        nextToken
      }
      friends {
        items {
          id
          username
          email
        }
        nextToken
      }
      favoriteCourses {
        items {
          id
          name
          holeCount
          courseLength
          yearEstablished
          redPar
          whitePar
          bluePar
          yellowPar
          teeType
          basketType
          description
          location
        }
        nextToken
      }
      currentGame {
        id
        course {
          id
          name
          holeCount
          courseLength
          yearEstablished
          redPar
          whitePar
          bluePar
          yellowPar
          teeType
          basketType
          description
          location
        }
        owner {
          id
          username
          email
        }
        players {
          nextToken
        }
        gameStatus
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        games {
          nextToken
        }
        friends {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameStatus
        }
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      course {
        id
        name
        holeCount
        holes {
          nextToken
        }
        courseLength
        yearEstablished
        redPar
        whitePar
        bluePar
        yellowPar
        teeType
        basketType
        description
        location
      }
      owner {
        id
        username
        email
        games {
          nextToken
        }
        friends {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameStatus
        }
      }
      players {
        items {
          id
          username
          email
        }
        nextToken
      }
      gameStatus
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        course {
          id
          name
          holeCount
          courseLength
          yearEstablished
          redPar
          whitePar
          bluePar
          yellowPar
          teeType
          basketType
          description
          location
        }
        owner {
          id
          username
          email
        }
        players {
          nextToken
        }
        gameStatus
      }
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      holeCount
      holes {
        items {
          id
          no
          redPar
          whitePar
          bluePar
          yellowPar
          redLength
          whiteLength
          blueLength
          yellowLength
        }
        nextToken
      }
      courseLength
      yearEstablished
      redPar
      whitePar
      bluePar
      yellowPar
      teeType
      basketType
      description
      location
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        holeCount
        holes {
          nextToken
        }
        courseLength
        yearEstablished
        redPar
        whitePar
        bluePar
        yellowPar
        teeType
        basketType
        description
        location
      }
      nextToken
    }
  }
`;
export const getHole = /* GraphQL */ `
  query GetHole($id: ID!) {
    getHole(id: $id) {
      id
      no
      course {
        id
        name
        holeCount
        holes {
          nextToken
        }
        courseLength
        yearEstablished
        redPar
        whitePar
        bluePar
        yellowPar
        teeType
        basketType
        description
        location
      }
      redPar
      whitePar
      bluePar
      yellowPar
      redLength
      whiteLength
      blueLength
      yellowLength
    }
  }
`;
export const listHoles = /* GraphQL */ `
  query ListHoles(
    $filter: ModelHoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        no
        course {
          id
          name
          holeCount
          courseLength
          yearEstablished
          redPar
          whitePar
          bluePar
          yellowPar
          teeType
          basketType
          description
          location
        }
        redPar
        whitePar
        bluePar
        yellowPar
        redLength
        whiteLength
        blueLength
        yellowLength
      }
      nextToken
    }
  }
`;
