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
            Enter the 4-digit code
          </v-card-text>
          <v-container>
            <v-form ref="signInForm">
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
              />
              <v-btn block :disabled="$v.gameCode.$invalid" @click="joinGameRequest" color="primary"
                >Join Game
              </v-btn>
              <v-alert
                dense
                border="top"
                colored-border
                close-text="Dismiss"
                dismissible
                v-model="isError"
                elevation="0"
                class="py-5"
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
  import { checkLobbyCode } from "../services";
  export default {
    name: "join-game",
    data() {
      return {
        gameCode: "",
        errorObj: "",
        isError: false,
      };
    },
    methods: {
      async joinGameRequest() {
        var response = await checkLobbyCode(this.gameCode);
        if (response.path) {
          this.$router.push({
            name: "join-lobby",
            params: { path: response.path, id: response.id },
          });
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
      gameCodeErrors() {
        const errors = [];
        if (!this.$v.gameCode.$dirty) return errors;
        !this.$v.gameCode.minLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.maxLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.required && errors.push("Game code is required");
        return errors;
      },
    },
  };
</script>
