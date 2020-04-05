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
      <v-toolbar-title>openFOLF - Confirm Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <!-- TODO: Not sure what is in the first text field -->
        <v-text-field label="*" type="text" />
        <v-text-field label="Confirmation Code" type="text" v-model="confirm" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="fakeConfirm" color="#41b883">CONFIRM</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="fakeResend">Lost the code? Resend code.</v-btn>
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
    name: "confirm-sign-up",
    data() {
      return {
        confirm: "",
      };
    },
    methods: {
      fakeConfirm() {
        console.log("Fake 'Confirm' triggered");
      },
      fakeResend() {
        console.log("Fake 'Resend code' triggered");
      },
      fakeBackToSignIn() {
        console.log("Fake 'Back to Signin' triggered");
      },
    },
  };
</script>
