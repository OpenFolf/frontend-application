<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="d-flex flex-column justify-center">
        <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat>
          <v-toolbar color="primary" flat>
            <v-toolbar-title>Join Game</v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <v-card-text class="headline text--white text-center">
            Enter the 3-letter code
          </v-card-text>
          <v-container>
            <v-form ref="signInForm" @submit.prevent>
              <v-text-field
                label="GAME CODE"
                type="text"
                v-model="gameCode"
                @change="$v.gameCode.$touch()"
                @blur="$v.gameCode.$touch()"
                required
                :error-messages="gameCodeErrors"
                outlined
                flat
                clearable
                @keyup.enter="joinGameRequest"
              />
              <v-btn
                block
                :disabled="$v.gameCode.$invalid"
                @click="joinGameRequest"
                color="primary"
              >
                Join Game
              </v-btn>
              <v-alert
                dense
                border="left"
                colored-border
                close-text="Dismiss"
                dismissible
                v-model="isError"
                elevation="0"
                color="error"
              >
                {{ errorObj }}
              </v-alert>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { required, minLength, maxLength } from "vuelidate/lib/validators";
  import { mapActions, mapGetters } from "vuex";
  import { replaceIcelandicCharacters } from "../services";
  export default {
    name: "join-game",
    data() {
      return {
        gameCode: "",
        errorObj: "",
        isError: false,
        gameObject: undefined,
      };
    },
    methods: {
      ...mapActions(["fetchLobbyGame", "fetchGame", "createPlayer"]),
      async joinGameRequest() {
        console.log("gameCode", this.gameCode);
        await this.checkLobbyCode(this.gameCode.toUpperCase());
        if (this.gameObject && !this.isError) {
          this.$router.push({
            name: "join-lobby",
            params: {
              path: replaceIcelandicCharacters(this.gameObject.course.name),
              id: this.gameObject.id,
            },
          });
        }
      },
      clearErrorObj() {
        this.errorObj = "";
        this.isError = false;
      },
      async checkLobbyCode(code) {
        await this.fetchLobbyGame(code);
        // TODO: Handle the unlikely event that 2 games have the same lobbyCode?
        this.gameObject = this.getGamesList.find((x) => x.lobbyCode == code);
        console.log("Gameobject: ", this.gameObject);
        if (!this.gameObject) {
          this.errorObj = `No game found with the lobby code ${code}`;
          this.isError = true;
        } else if (this.gameObject.gameStatus != 0) {
          // All players registered in game
          const gamePlayers = this.gameObject.players.items;
          var playerInGame = false;
          // Loop through and check if user is player in game
          for (var i = 0; i < gamePlayers.length; i++) {
            if (gamePlayers[i].id == this.getUserId) {
              // If he is user in game then fetch game into state and set playerInGame bool to true
              playerInGame = true;
              await this.fetchGame(this.gameObject.id);
              // TODO: Route to scorecard. Through lobby? Gamestatus watcher not working as gameStatus technically not updating. Talk to Aex
            }
          }
          // The game has been started but you are not one of the players
          if (!playerInGame) {
            this.errorObj = `A game with the lobby code ${code} found but has already started`;
            this.isError = true;
          }
        } else {
          await this.createPlayer(this.gameObject.id);
          await this.fetchGame(this.gameObject.id);
        }
      },
    },
    validations: {
      gameCode: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3),
      },
    },
    computed: {
      ...mapGetters(["getGamesList", "getUserId"]),
      gameCodeErrors() {
        const errors = [];
        if (!this.$v.gameCode.$dirty) return errors;
        !this.$v.gameCode.minLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.maxLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.required && errors.push("Game code is required");
        if (this.isError) errors.push(this.errorObj);
        this.clearErrorObj();
        return errors;
      },
    },
  };

  // // Used to check a "join lobby" request by going through all games in the state "lobby" and cross referencing its lobby code. Returns path and id.
  // export async function checkLobbyCode(lobbyCode) {
  //   // Synchronize the store and backend
  //   await Store.dispatch("fetchGames");

  //   // Look up the lobby code
  //   const gameExists = Store.getters.getGamesList.find((x) => x.lobbyCode == lobbyCode);

  //   if (!gameExists) {
  //     return `No game found with the lobby code ${lobbyCode}`;
  //   } else if (gameExists.gameStatus !== "0") {
  //     return `A game with the lobby code ${lobbyCode} found but has already started`;
  //   } else if (gameExists || gameExists.gameStatus === "0") {
  //     try {
  //       // Create the new player in the database
  //       Store.dispatch("createPlayer", gameExists.id);

  //       // Get the new Game object and set that as current game
  //       Store.dispatch("fetchGame", gameExists.id);

  //       // TODO: Maybe redundant, but works, should be able to get straight from the state
  //       return { path: replaceIcelandicCharacters(gameExists.course.name), id: gameExists.id };
  //     } catch {
  //       throw new TypeError("CheckLobbyCode error, lobby code used: ", lobbyCode);
  //     }
  //   }
  //   throw new TypeError("CheckLobbyCode error, lobby code used: ", lobbyCode);
  // }
</script>
