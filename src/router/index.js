import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import EmailVerification from '@/components/EmailVerification'
import LoginRegisterForm from '@/components/LoginRegisterForm'
import EmptyRouterPage from '@/pages/EmptyRouterPage'
import PublicTestIndexPage from '@/pages/Public/Test/Index'
import PublicTestShowPage from '@/pages/Public/Test/Show'
import AccountTestIndexPage from '@/pages/Account/Test/Index'
import AccountTestShowPage from '@/pages/Account/Test/Show'
import AccountTestCreatePage from '@/pages/Account/Test/Create'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(error => {
        if (error.name !== "NavigationDuplicated") {
            throw error;
        }
    });
};

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'StartPage',
            component: StartPage
        },
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
            path: '/tests',
            component: EmptyRouterPage,
            children: [
                {
                    path: '',
                    name: 'PublicTestIndexPage',
                    component: PublicTestIndexPage,
                },
                {
                    path: ':test_id',
                    name: 'PublicTestShowPage',
                    component: PublicTestShowPage,
                }
            ],
        },
        {
            path: '/account',
            component: EmptyRouterPage,
            children: [
                {
                    path: 'tests',
                    component: EmptyRouterPage,
                    children: [
                        {
                            path: '',
                            name: 'AccountTestIndexPage',
                            component: AccountTestIndexPage,
                        },
                        {
                            path: 'create',
                            name: 'AccountTestCreatePage',
                            component: AccountTestCreatePage,
                        },
                        {
                            path: ':test_id',
                            name: 'AccountTestShowPage',
                            component: AccountTestShowPage,
                        }
                    ],
                }
            ],
        }
    ]
});