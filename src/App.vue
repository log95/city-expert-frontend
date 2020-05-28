<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      absolute
    >
      <v-toolbar-title>City Expert</v-toolbar-title>

      <v-spacer></v-spacer>


    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

      <v-card height="150">
        <v-footer
                app
                absolute
                class="font-weight-medium"
        >
          <v-col
                  class="text-center"
                  cols="12"
          >
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
          </v-col>
        </v-footer>
      </v-card>

  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
