export default {
    methods: {
        isAuthorized() {
            return localStorage.getItem('JWT_TOKEN') !== null;
        }
    }
}
