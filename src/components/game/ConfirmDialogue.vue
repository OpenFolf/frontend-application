<template>
  <v-dialog v-model="localDialog" width="300" overlay-opacity="0.7">
    <template v-slot:activator="{ on }">
      <template v-if="message.icon">
        <v-icon color="error" small v-on="on"> {{ message.icon }} </v-icon>
      </template>
      <template v-if="message.title === 'End Game'">
        <v-btn small color="purple" class="ml-2" v-on="on">
          <span class="font-weight-bold title">end game</span>
        </v-btn>
      </template>
      <v-btn block large class="font-weight-bold" v-on="on" :color="message.headerColor" v-else>
        {{ message.title }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline primary font-weight-bold" primary-title>
        {{ message.title }}
      </v-card-title>
      <v-card-text class="mt-3">{{ message.body }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn large color="error" class="font-weight-bold" @click="localDialog = false">
          {{ message.button1 }}
        </v-btn>
        <v-btn
          large
          class="font-weight-bold"
          v-if="message.title === 'Start Game'"
          color="primary"
          @click="$emit('start')"
        >
          {{ message.button2 }}
        </v-btn>
        <v-btn
          large
          class="font-weight-bold"
          v-if="message.title === 'Cancel Game'"
          color="primary"
          @click="$emit('cancelGame')"
        >
          {{ message.button2 }}
        </v-btn>
        <v-btn
          large
          class="font-weight-bold"
          v-if="message.title === 'Kick Player'"
          color="primary"
          @click="$emit('removeUser', userToRemove)"
        >
          {{ message.button2 }}
        </v-btn>
        <v-btn
          large
          class="font-weight-bold"
          v-if="message.title === 'Leave Lobby'"
          color="primary"
          @click="$emit('removeUser', userToRemove)"
        >
          {{ message.button2 }}
        </v-btn>
        <v-btn
          large
          class="font-weight-bold"
          v-if="message.title === 'End Game'"
          color="primary"
          @click="$emit('finishGame')"
        >
          {{ message.button2 }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "confirm-dialogue",
    props: {
      dialog: {
        type: Boolean,
        required: true,
      },
      message: {
        type: Object,
        required: true,
      },
      userToRemove: {
        type: String,
      },
    },
    data() {
      return {
        localDialog: true,
      };
    },
    watch: {
      dialog: {
        immediate: true,
        handler() {
          this.localDialog = this.dialog;
        },
      },
    },
  };
</script>

<style lang="scss" scoped></style>
