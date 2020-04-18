<template>
  <div class="text-center">
    <v-dialog v-model="localDialog" width="500" overlay-opacity="0.7">
      <template v-slot:activator="{ on }">
        <template v-if="message.icon">
          <v-icon color="error" small v-on="on"> {{ message.icon }} </v-icon>
        </template>
        <v-btn v-on="on" :color="message.headerColor" v-else>
          {{ message.title }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline primary" primary-title>
          {{ message.title }}
        </v-card-title>
        {{ message.body }}
        <v-card-text> </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">
            {{ message.button1 }}
          </v-btn>
          <v-btn v-if="message.title === 'Start Game'" color="primary" @click="$emit('start')">
            {{ message.button2 }}
          </v-btn>
          <v-btn
            v-if="message.title === 'Kick Player'"
            @click="$emit('deletePlayer', userToKickId)"
          >
            {{ message.button2 }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
