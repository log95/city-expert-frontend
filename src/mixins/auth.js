import UserRole from "../enum/UserRole";

export default {
    methods: {
        isAuthorized() {
            return localStorage.getItem('JWT_TOKEN') !== null;
        },
        isModerator() {
            const user = localStorage.getItem('USER');
            if (!user) {
                return false;
            }

            const roles = JSON.parse(user).roles;

            return roles.includes(UserRole.MODERATOR);
        },
    }
}
