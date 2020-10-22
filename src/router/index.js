import Vue from 'vue'
import Router from 'vue-router'
import EmptyRouterPage from '@/pages/EmptyRouterPage'
import StartPage from '@/pages/StartPage'
import EmailVerification from '@/pages/LoginRegister/EmailVerification'
import LoginRegister from '@/pages/LoginRegister/LoginRegister'
import PublicTestIndexPage from '@/pages/Public/Test/Index'
import PublicTestShowPage from '@/pages/Public/Test/Show'
import AccountTestIndexPage from '@/pages/Account/Test/Index'
import AccountTestShowPage from '@/pages/Account/Test/Show'
import AccountTestCreatePage from '@/pages/Account/Test/Create'
import AccountTestUpdatePage from '@/pages/Account/Test/Update'
import ModerationTestIndexPage from '@/pages/Moderation/Test/Index'
import ModerationTestShowPage from '@/pages/Moderation/Test/Show'

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
            name: 'LoginRegister',
            component: LoginRegister,
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
                        },
                        {
                            path: ':test_id/update',
                            name: 'AccountTestUpdatePage',
                            component: AccountTestUpdatePage,
                        },
                    ],
                }
            ],
        },
        {
            path: '/moderation',
            component: EmptyRouterPage,
            children: [
                {
                    path: 'tests',
                    component: EmptyRouterPage,
                    children: [
                        {
                            path: '',
                            name: 'ModerationTestIndexPage',
                            component: ModerationTestIndexPage,
                        },
                        {
                            path: ':test_id',
                            name: 'ModerationTestShowPage',
                            component: ModerationTestShowPage,
                        }
                    ],
                }
            ],
        }
    ]
});
