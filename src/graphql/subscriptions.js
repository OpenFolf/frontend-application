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
      favoritecourses {
        items {
          id
          name
          courselength
          yearestablished
          parinfo
          teetype
          baskettype
          description
          streetaddress
          postalcode
          location
        }
        nextToken
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
      favoritecourses {
        items {
          id
          name
          courselength
          yearestablished
          parinfo
          teetype
          baskettype
          description
          streetaddress
          postalcode
          location
        }
        nextToken
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
      favoritecourses {
        items {
          id
          name
          courselength
          yearestablished
          parinfo
          teetype
          baskettype
          description
          streetaddress
          postalcode
          location
        }
        nextToken
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
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
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
        favoritecourses {
          nextToken
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
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
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
        favoritecourses {
          nextToken
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
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
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
        favoritecourses {
          nextToken
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
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
      id
      name
      holes {
        items {
          id
          no
          nickname
          par
        }
        nextToken
      }
      courselength
      yearestablished
      parinfo
      teetype
      baskettype
      description
      streetaddress
      postalcode
      location
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
      id
      name
      holes {
        items {
          id
          no
          nickname
          par
        }
        nextToken
      }
      courselength
      yearestablished
      parinfo
      teetype
      baskettype
      description
      streetaddress
      postalcode
      location
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
      id
      name
      holes {
        items {
          id
          no
          nickname
          par
        }
        nextToken
      }
      courselength
      yearestablished
      parinfo
      teetype
      baskettype
      description
      streetaddress
      postalcode
      location
    }
  }
`;
export const onCreateHole = /* GraphQL */ `
  subscription OnCreateHole {
    onCreateHole {
      id
      no
      nickname
      course {
        id
        name
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
        location
      }
      par
    }
  }
`;
export const onUpdateHole = /* GraphQL */ `
  subscription OnUpdateHole {
    onUpdateHole {
      id
      no
      nickname
      course {
        id
        name
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
        location
      }
      par
    }
  }
`;
export const onDeleteHole = /* GraphQL */ `
  subscription OnDeleteHole {
    onDeleteHole {
      id
      no
      nickname
      course {
        id
        name
        holes {
          nextToken
        }
        courselength
        yearestablished
        parinfo
        teetype
        baskettype
        description
        streetaddress
        postalcode
        location
      }
      par
    }
  }
`;
