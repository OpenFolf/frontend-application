/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
export const createHole = /* GraphQL */ `
  mutation CreateHole(
    $input: CreateHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    createHole(input: $input, condition: $condition) {
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
export const updateHole = /* GraphQL */ `
  mutation UpdateHole(
    $input: UpdateHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    updateHole(input: $input, condition: $condition) {
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
export const deleteHole = /* GraphQL */ `
  mutation DeleteHole(
    $input: DeleteHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    deleteHole(input: $input, condition: $condition) {
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
