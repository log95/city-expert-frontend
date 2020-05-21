import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from '@/components/HelloWorld2'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/hello2',
            name: 'Hello2',
            component: HelloWorld2
        },
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
        },
    ]
});