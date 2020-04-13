// Queries, mutations and subscriptions for Player object

export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer($input: CreatePlayerInput!, $condition: ModelPlayerConditionInput) {
    createPlayer(input: $input, condition: $condition) {
      id
      user {
        email
      }
      game {
        id
        course {
          id
          name
        }
      }
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer($input: UpdatePlayerInput!, $condition: ModelPlayerConditionInput) {
    updatePlayer(input: $input, condition: $condition) {
      
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer($input: DeletePlayerInput!, $condition: ModelPlayerConditionInput) {
    deletePlayer(input: $input, condition: $condition) {
      
    }
  }
`;
