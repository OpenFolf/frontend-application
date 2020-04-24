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
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { required, minLength, maxLength } from "vuelidate/lib/validators";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    name: "join-game",
    data() {
      return {
        gameCode: "",
      };
    },
    created() {
      this.bottomNavHandler(true);
    },
    methods: {
      ...mapMutations(["CLEAR_ERRORS"]),
      ...mapActions(["joinGame", "defaultRouting", "showBottomNav"]),
      joinGameRequest() {
        this.joinGame(this.gameCode.toUpperCase());
      },
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
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
      ...mapGetters(["errorMsg", "getGameStatus"]),
      gameCodeErrors() {
        const errors = [];
        console.log("this.errorMsg", this.errorMsg.message);
        if (this.errorMsg.message) {
          errors.push(this.errorMsg.message);
          this.CLEAR_ERRORS();
          return errors;
        }
        if (!this.$v.gameCode.$dirty) return errors;
        !this.$v.gameCode.minLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.maxLength && errors.push("Game code must be 3 characters long");
        !this.$v.gameCode.required && errors.push("Game code is required");
        return errors;
      },
    },
    watch: {
      getGameStatus() {
        this.defaultRouting();
      },
    },
  };
</script>
