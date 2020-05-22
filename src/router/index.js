import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import EmailVerification from '@/components/EmailVerification'
import LoginRegisterForm from '@/components/LoginRegisterForm'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/verification/:user_id/:code',
            name: 'EmailVerification',
            component: EmailVerification,
        },
        {
            path: '/login',
            name: 'LoginRegisterForm',
            component: LoginRegisterForm,
        },
        {
            path: '/',
            name: 'StartPage',
            component: StartPage
        },
    ]
});