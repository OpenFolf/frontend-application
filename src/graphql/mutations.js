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
      gamesPlayed {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      favoriteCourses {
        items {
          id
        }
        nextToken
      }
      currentGame {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      avatar
      defTee
      defMode
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
      gamesPlayed {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      favoriteCourses {
        items {
          id
        }
        nextToken
      }
      currentGame {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      avatar
      defTee
      defMode
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
      gamesPlayed {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      favoriteCourses {
        items {
          id
        }
        nextToken
      }
      currentGame {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      avatar
      defTee
      defMode
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      team
      teeColor
      totalScore
      gameHoles {
        items {
          id
        }
        nextToken
      }
      scoreArray
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      team
      teeColor
      totalScore
      gameHoles {
        items {
          id
        }
        nextToken
      }
      scoreArray
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
      team
      teeColor
      totalScore
      gameHoles {
        items {
          id
        }
        nextToken
      }
      scoreArray
    }
  }
`;
export const createGameHole = /* GraphQL */ `
  mutation CreateGameHole(
    $input: CreateGameHoleInput!
    $condition: ModelGameHoleConditionInput
  ) {
    createGameHole(input: $input, condition: $condition) {
      id
      hole {
        id
        no
        course {
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
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
    }
  }
`;
export const updateGameHole = /* GraphQL */ `
  mutation UpdateGameHole(
    $input: UpdateGameHoleInput!
    $condition: ModelGameHoleConditionInput
  ) {
    updateGameHole(input: $input, condition: $condition) {
      id
      hole {
        id
        no
        course {
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
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
      }
    }
  }
`;
export const deleteGameHole = /* GraphQL */ `
  mutation DeleteGameHole(
    $input: DeleteGameHoleInput!
    $condition: ModelGameHoleConditionInput
  ) {
    deleteGameHole(input: $input, condition: $condition) {
      id
      hole {
        id
        no
        course {
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
      game {
        id
        course {
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
        owner {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        players {
          nextToken
        }
        gameType
        lobbyCode
        gameStatus
        gameDate
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
          nextToken
        }
      }
      owner {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      players {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      gameType
      lobbyCode
      gameStatus
      gameDate
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
          nextToken
        }
      }
      owner {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      players {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      gameType
      lobbyCode
      gameStatus
      gameDate
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
          nextToken
        }
      }
      owner {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      players {
        items {
          id
          team
          teeColor
          totalScore
          scoreArray
        }
        nextToken
      }
      gameType
      lobbyCode
      gameStatus
      gameDate
    }
  }
`;
export const createUserFavoriteCourse = /* GraphQL */ `
  mutation CreateUserFavoriteCourse(
    $input: CreateUserFavoriteCourseInput!
    $condition: ModelUserFavoriteCourseConditionInput
  ) {
    createUserFavoriteCourse(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      course {
        id
        name
        holeCount
        holes {
          nextToken
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
          nextToken
        }
      }
    }
  }
`;
export const updateUserFavoriteCourse = /* GraphQL */ `
  mutation UpdateUserFavoriteCourse(
    $input: UpdateUserFavoriteCourseInput!
    $condition: ModelUserFavoriteCourseConditionInput
  ) {
    updateUserFavoriteCourse(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      course {
        id
        name
        holeCount
        holes {
          nextToken
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
          nextToken
        }
      }
    }
  }
`;
export const deleteUserFavoriteCourse = /* GraphQL */ `
  mutation DeleteUserFavoriteCourse(
    $input: DeleteUserFavoriteCourseInput!
    $condition: ModelUserFavoriteCourseConditionInput
  ) {
    deleteUserFavoriteCourse(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        gamesPlayed {
          nextToken
        }
        favoriteCourses {
          nextToken
        }
        currentGame {
          id
          gameType
          lobbyCode
          gameStatus
          gameDate
        }
        avatar
        defTee
        defMode
      }
      course {
        id
        name
        holeCount
        holes {
          nextToken
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
          nextToken
        }
      }
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
        nextToken
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
          id
        }
        nextToken
      }
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
        nextToken
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
          id
        }
        nextToken
      }
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
        nextToken
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
          id
        }
        nextToken
      }
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
          nextToken
        }
      }
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
          nextToken
        }
      }
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
          nextToken
        }
      }
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
`;
