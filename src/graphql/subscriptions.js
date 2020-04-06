/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
