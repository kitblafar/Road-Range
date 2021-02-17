import Vue from 'vue'
import VueRouter from 'vue-router'
import LivePage from '../components/LivePage'
import SavedPage from '../components/SavedPage'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Live',
            component: LivePage
        },
        {
            path: '/Saved',
            name: 'Saved',
            component: SavedPage,
        },
    ]
})