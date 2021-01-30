import Vue from 'vue'
import Router from 'vue-router'
import LivePage from '../components/LivePage'
import SavedPage from '../components/SavedPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Live',
            component: LivePage
        },
        {
            path: '/Saved',
            name: 'Saved',
            component: SavedPage
        },
    ]
})