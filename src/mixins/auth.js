import UserRole from "../enum/UserRole";

export default {
    methods: {
        isAuthorized() {
            return localStorage.getItem('JWT_TOKEN') !== null;
        },
        isModerator() {
            const roles = JSON.parse(localStorage.getItem('USER')).roles;

            return roles.includes(UserRole.MODERATOR);
        },
    }
}
