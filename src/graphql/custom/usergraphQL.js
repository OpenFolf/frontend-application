//Get a single user from ID
export const fetchUser = /* GraphQL */ `
  query FetchUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      defTee
      defMode
      favoriteCourses {
        items {
          course {
            name
          }
        }
      }
      gamesPlayed {
        items {
          game {
            owner {
              username
            }
            course {
              name
            }
            players {
              items {
                user {
                  username
                }
                totalScore
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchUserGameList = /* GraphQL */ `
  query FetchUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      gamesPlayed {
        items {
          id
          scoreArray
          totalScore
          game {
            gameStatus
            gameDate
            owner {
              id
              username
              email
            }
            players {
              items {
                user {
                  id
                  username
                  email
                }
                totalScore
                scoreArray
              }
            }
          }
        }
      }
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      username
    }
  }
`;
