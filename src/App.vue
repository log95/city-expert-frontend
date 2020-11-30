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
  import wsHandler from "@/ws/handler";

  export default {
    name: 'App',
    components: {
      LayoutHeader,
      LayoutFooter,
      Snackbar,
      Notifications,
    },
    methods: {
      handleWsMessages() {
        if (!this.isAuthorized()) {
          return;
        }

        const wsBaseUrl = process.env.VUE_APP_WS_BASE_URL;
        const wsUrl = wsBaseUrl + '?token=' + localStorage.getItem('JWT_TOKEN');

        let wsConn = new WebSocket(wsUrl);

        wsConn.onmessage = function (e) {
          wsHandler.handleWsMessage(e.data);
        };
      },
    },
    created() {
      this.handleWsMessages();
    }
  };
</script>
