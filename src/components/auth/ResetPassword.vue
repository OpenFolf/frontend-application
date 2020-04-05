<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="#41b883">
      <v-img
        class="mr-2"
        :src="require('@/assets/basket_white.png')"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>openFOLF - Reset Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-Mail" type="email" v-model="userEmail" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="fakeReset" color="#41b883">Reset</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="fakeBackToSignIn">Back to Sign In.</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "reset-password",
    data() {
      return {
        userEmail: "",
      };
    },
    methods: {
      fakeBackToSignIn() {
        console.log("Fake 'Back to Sign In' triggered");
      },
      fakeReset() {
        console.log("Fake 'Reset' triggered");
      },
    },
  };
</script>
