<template>
  <v-content>
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text class="headline text--white text-center">
                Enter the 4-digit code
              </v-card-text>
              <v-container>
                <v-text-field outlined flat clearable label="GAME CODE" />
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-content>
</template>

<script>
  export default {
    name: "join-game",
  };
</script>
