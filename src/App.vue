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
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'App',
    components: {
      LayoutHeader,
      LayoutFooter,
      Snackbar,
      Notifications,
    },
    computed: {
      ...mapState('userPoints', {
        points: 'points',
      }),
    },
    methods: {
      ...mapMutations({
        setUserPoints: 'userPoints/setPoints',
      }),
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
      async loadUserPoints() {
        if (!this.isAuthorized()) {
          return;
        }

        // Points is already loaded.
        if (this.points !== null) {
          return;
        }

        const response = await this.$api.get('account/user/points/');

        this.setUserPoints(response.data);
      },
    },
    created() {
      this.handleWsMessages();

      this.loadUserPoints();
    }
  };
</script>
