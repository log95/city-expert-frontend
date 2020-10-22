<template>
  <v-app>
    <LayoutHeader></LayoutHeader>

    <v-content>
      <v-container fluid>
        <router-view></router-view>

        <Snackbar></Snackbar>
      </v-container>
    </v-content>

    <LayoutFooter></LayoutFooter>

  </v-app>
</template>

<script>
  import LayoutHeader from '@/components/Layout/Header';
  import LayoutFooter from '@/components/Layout/Footer';
  import Snackbar from "@/components/Ui/Snackbar";

  export default {
    name: 'App',
    components: {
      LayoutHeader,
      LayoutFooter,
      Snackbar,
    },
  };
</script>
