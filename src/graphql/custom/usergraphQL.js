//Get a single user from ID
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
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
