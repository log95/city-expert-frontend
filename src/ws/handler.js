import store from '../store';
import WsMessageType from "../enum/WsMessageType";
import i18n from "../i18n";

export default {
    handleWsMessage (message) {
        const data = JSON.parse(message);

        let text = '';

        switch (data.TYPE) {
            case WsMessageType.NEW_TEST_COMMENT:
                text = i18n.t('WS_MESSAGE.NEW_TEST_COMMENT', {'link': data.TEST_URL, 'link_text': data.TEST_QUESTION});
                break;

            default:
                console.error('Undefined ws message type.');
                return;
        }

        store.commit('notifications/addNotification', {
            'text': text,
        });
    },
}
