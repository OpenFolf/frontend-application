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
      ...mapActions(["fetchGames", "fetchGame", "createPlayer"]),
      async joinGameRequest() {
        console.log("gameCode", this.gameCode);
        await this.checkLobbyCode(this.gameCode.toUpperCase());
        if (this.gameObject && !this.isError) {
          await this.createPlayer(this.gameObject.id);
          await this.fetchGame(this.gameObject.id);
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
        await this.fetchGames();
        this.gameObject = this.getGamesList.find((x) => x.lobbyCode == code);
        if (!this.gameObject) {
          this.errorObj = `No game found with the lobby code ${code}`;
          this.isError = true;
        } else if (this.gameObject.gameStatus != 0) {
          this.errorObj = `A game with the lobby code ${code} found but has already started`;
          this.isError = true;
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
      ...mapGetters(["getGamesList"]),
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
</script>
