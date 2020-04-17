// Queries, mutations and subscriptions for Player object

export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer($input: CreatePlayerInput!, $condition: ModelPlayerConditionInput) {
    createPlayer(input: $input, condition: $condition) {
      id
      user {
        username
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

// Subscriptions
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      user {
        id
        email
        username
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer($id: ID!) {
    onUpdatePlayer(id: $id) {
      id
      user {
        id
        username
      }
      team
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
      }
      game {
        id
      }
      scoreArray
    }
  }
`;
