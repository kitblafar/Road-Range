import Vue from 'vue'
import VueRouter from 'vue-router'
import LivePage from '../components/LivePage'
import SavedPage from '../components/SavedPage'
import Login from "@/components/Login";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login",
                component:[]
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/live',
            name: 'Live',
            component: LivePage,
        },
        {
            path: '/Saved',
            name: 'Saved',
            component: SavedPage,
        },
    ]
})