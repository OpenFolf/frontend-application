/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
export const onCreateGameHole = /* GraphQL */ `
  subscription OnCreateGameHole {
    onCreateGameHole {
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
export const onUpdateGameHole = /* GraphQL */ `
  subscription OnUpdateGameHole {
    onUpdateGameHole {
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
export const onDeleteGameHole = /* GraphQL */ `
  subscription OnDeleteGameHole {
    onDeleteGameHole {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateUserFavoriteCourse = /* GraphQL */ `
  subscription OnCreateUserFavoriteCourse {
    onCreateUserFavoriteCourse {
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
export const onUpdateUserFavoriteCourse = /* GraphQL */ `
  subscription OnUpdateUserFavoriteCourse {
    onUpdateUserFavoriteCourse {
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
export const onDeleteUserFavoriteCourse = /* GraphQL */ `
  subscription OnDeleteUserFavoriteCourse {
    onDeleteUserFavoriteCourse {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
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
export const onCreateHole = /* GraphQL */ `
  subscription OnCreateHole {
    onCreateHole {
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
export const onUpdateHole = /* GraphQL */ `
  subscription OnUpdateHole {
    onUpdateHole {
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
export const onDeleteHole = /* GraphQL */ `
  subscription OnDeleteHole {
    onDeleteHole {
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
