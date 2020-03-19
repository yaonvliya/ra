import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'security',
            name: 'index',
            component: () => import('../views/main'),
            meta: {title: '首页'},
            children: [
                {
                    path: '/modules',
                    name: 'modules',
                    component: resolve => require(['../views/modules'], resolve),
                    meta: {title: '模块菜单'},
                },
                {
                    path: '/security',
                    name: 'security',
                    component: () => import('../views/security'),
                    meta: {title: '安全态势'},
                },
                {
                    path: '/area',
                    name: 'area',
                    component: resolve => require(['../views/area'], resolve),
                    meta: {title: '区域安全管理'},
                    children: [
                        {
                            path: '/area',
                            name: 'area',
                            component: resolve => require(['../views/area'], resolve),
                            meta: {title: '区域安全管理事故分析'},
                        },
                    ]
                },
                {
                    path: '/road',
                    name: 'road',
                    component: resolve => require(['../views/road'], resolve),
                    meta: {title: '道路安全管理'},
                },
            ]
        }
    ]
})
