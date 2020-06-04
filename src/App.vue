<template>
  <v-app>
    <LayoutHeader></LayoutHeader>

    <v-content>
      <v-container fluid>
        <router-view></router-view>

        <Snackbar></Snackbar>
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
  import LayoutHeader from '@/components/Layout/Header';
  import Snackbar from "@/components/Ui/Snackbar";

  export default {
    name: 'App',
    components: {
      LayoutHeader,
      Snackbar,
    },
  };
</script>
