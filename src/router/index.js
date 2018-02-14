import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
     // mode: 'history',
    routes: routers,
    hashbang: false,
   
    saveScrollPosition: true
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    
    Util.title(to.meta.title);
    
    
        if (!Cookies.get('auth_token') && to.name !== 'login') { // Determine if you have already logged in and the page you are visiting is not a login page
            
            next({
                name: 'login'
            });
        } else if (Cookies.get('auth_token') && to.name === 'login') { // Determine if you are logged in and go to the login page
            Util.title();
            
            next({
                name: 'Dashboard'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // Need to determine the permissions of the route
                if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // If you enter in the address bar is a menu is the default to open the page of the first two menu
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // No allocation of routing authority, directly
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
   
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
