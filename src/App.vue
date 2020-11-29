<template>
  <v-app>
    <LayoutHeader></LayoutHeader>

    <v-content>
      <v-container fluid>
        <router-view></router-view>

        <Snackbar></Snackbar>

        <Notifications></Notifications>
      </v-container>
    </v-content>

    <LayoutFooter></LayoutFooter>

  </v-app>
</template>

<script>
  import LayoutHeader from '@/components/Layout/Header';
  import LayoutFooter from '@/components/Layout/Footer';
  import Snackbar from "@/components/Ui/Snackbar";
  import Notifications from "@/components/Ui/Notifications";

  export default {
    name: 'App',
    components: {
      LayoutHeader,
      LayoutFooter,
      Snackbar,
      Notifications,
    },
    created() {
      if (!this.isAuthorized()) {
        return;
      }

      const wsBaseUrl = process.env.VUE_APP_WS_BASE_URL;
      const wsUrl = wsBaseUrl + '?token=' + localStorage.getItem('JWT_TOKEN');

      let wsConn = new WebSocket(wsUrl);

      wsConn.onmessage = function (e) {
        console.log(JSON.parse(e.data));
      };
    }
  };
</script>
