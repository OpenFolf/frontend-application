/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      gamesPlayed {
        items {
          id
          team
          teeColor
          totalScore
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
      }
      avatar
      defTee
      defMode
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
        }
        avatar
        defTee
        defMode
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
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
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          email
          avatar
          defTee
          defMode
        }
        game {
          id
          gameType
          lobbyCode
          gameStatus
        }
        team
        teeColor
        totalScore
        gameHoles {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getGameHole = /* GraphQL */ `
  query GetGameHole($id: ID!) {
    getGameHole(id: $id) {
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
      }
    }
  }
`;
export const listGameHoles = /* GraphQL */ `
  query ListGameHoles(
    $filter: ModelGameHoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameHoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hole {
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
        game {
          id
          gameType
          lobbyCode
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
        }
        nextToken
      }
      gameType
      lobbyCode
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
      }
      nextToken
    }
  }
`;
export const getUserFavoriteCourse = /* GraphQL */ `
  query GetUserFavoriteCourse($id: ID!) {
    getUserFavoriteCourse(id: $id) {
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
export const listUserFavoriteCourses = /* GraphQL */ `
  query ListUserFavoriteCourses(
    $filter: ModelUserFavoriteCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFavoriteCourses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user {
          id
          username
          email
          avatar
          defTee
          defMode
        }
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
      nextToken
    }
  }
`;
