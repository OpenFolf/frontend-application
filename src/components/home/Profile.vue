<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="accent" class="pa-1 overflow-x-auto" flat>
          <v-card-title class="headline">
            <span class="font-weight-bold title">Tee name:</span>
            <span data-testid="user-name" class="display-1 ml-3"> {{ getUserName }}</span>
          </v-card-title>
          <v-divider />
          <v-card-title class="headline">
            <span class="headline">Choose a 3 letter Tee name:</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent ref="signInForm" color="red">
              <v-text-field
                label="Tee Name"
                type="name"
                @blur="$v.name.$touch()"
                :error-messages="nameErrors"
                v-model.lazy="name"
                required
                outlined
              />
              <v-btn
                :disabled="$v.name.$invalid"
                @click="saveLocalUserName"
                block
                class="px-2"
                append-icon="fa-save"
                color="primary"
                data-testid="user-name-send"
                >Save
              </v-btn>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card class="pa-1 my-1 d-flex flex-row align-center" color="transparent" flat>
            <v-card-title class="headline">Set Theme:</v-card-title>
            <v-spacer />
            <v-btn
              x-large
              :color="!getIsUserDark ? 'accent' : 'warning'"
              depressed
              @click="setUserTheme"
              data-testid="user-theme"
            >
              <v-icon data-testid="user-theme-button" :color="!getIsUserDark ? 'white' : 'black'">
                {{ !getIsUserDark ? "fa-moon" : "fa-sun" }}
              </v-icon>
            </v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // TODO: @ARNAR - NO MUTATONS, ONLY DISPATCH
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import { required, minLength, maxLength } from "vuelidate/lib/validators";
  export default {
    name: "home-profile",
    data() {
      return {
        name: "",
      };
    },
    validations: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(3),
      },
    },
    computed: {
      ...mapGetters(["getUserName", "errorMsg", "getIsUserDark", "signedIn"]),
      nameErrors() {
        const errors = [];
        if (this.errorMsg.message) {
          errors.push(this.errorMsg.message);
          this.CLEAR_ERRORS();
          return errors;
        }
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.minLength && errors.push("Tee name must be at least 2 characters long");
        !this.$v.name.maxLength && errors.push("Tee name must be at most 3 characters long");
        !this.$v.name.required && errors.push("Tee name is required.");
        return errors;
      },
    },
    methods: {
      // TODO: @ARNAR - NO MUTATIONS FROM COMPONENTS, ONLY DISPATCH
      ...mapMutations(["CLEAR_ERRORS"]),
      ...mapActions(["setUserName", "setUserTheme", "signOutRouting"]),
      saveLocalUserName() {
        this.setUserName(this.name.toUpperCase());
      },
    },
    watch: {
      signedIn() {
        this.signOutRouting();
      },
    },
  };
</script>
