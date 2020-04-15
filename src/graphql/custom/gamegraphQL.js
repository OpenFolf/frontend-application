// Queries, mutations and subscriptions for Game object

export const createGame = /* GraphQL */ `
  mutation CreateGame($input: CreateGameInput!, $condition: ModelGameConditionInput) {
    createGame(input: $input, condition: $condition) {
      id
      owner {
        id
        username
        email
      }
      course {
        name
      }
      players {
        items {
          user {
            id
            username
            email
          }
        }
      }
      gameStatus
      lobbyCode
    }
  }
`;

export const updateGame = /* GraphQL */ `
  mutation UpdateGame($input: UpdateGameInput!, $condition: ModelGameConditionInput) {
    updateGame(input: $input, condition: $condition) {
      
    }
  }
`;

export const deleteGame = /* GraphQL */ `
  mutation DeleteGame($input: DeleteGameInput!, $condition: ModelGameConditionInput) {
    deleteGame(input: $input, condition: $condition) {
      
    }
  }
`;

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      owner {
        id
        username
        email
      }
      course {
        name
      }
      players {
        items {
          user {
            id
            username
            email
          }
          totalScore
        }
      }
      gameStatus
      lobbyCode
    }
  }
`;

export const listGames = /* GraphQL */ `
  query ListGames($filter: ModelGameFilterInput, $limit: Int, $nextToken: String) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        course {
          name
        }
        owner {
          username
          email
        }
        players {
          items {
            user {
              username
              email
            }
          }
        }
        gameStatus
        lobbyCode
      }
      nextToken
    }
  }
`;
