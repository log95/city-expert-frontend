import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import EmailVerification from '@/components/EmailVerification'
import LoginRegisterForm from '@/components/LoginRegisterForm'
import PublicTestIndexPage from '@/pages/Public/Test/Index'
import PublicTestShowPage from '@/pages/Public/Test/Show'

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
        {
            path: '/tests',
            name: 'PublicTestIndexPage',
            component: PublicTestIndexPage,
            children: [
                {
                    path: ':test_id',
                    name: 'PublicTestShowPage',
                    component: PublicTestShowPage,
                }
            ],
        }
    ]
});