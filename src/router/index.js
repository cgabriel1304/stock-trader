import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue';
import Portfolio from '../components/portfolio/Portfolio.vue';
import Stocks from '../components/stocks/Stocks.vue';
import Page404 from '../components/shared/404.vue';

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/portfolio', component: Portfolio, name: 'Portfolio' },
    { path: '/stocks', component: Stocks, name: 'Stocks' },
    { path: '*', component: Page404, name: 'NotFound' }
];

export default new VueRouter({
    mode: 'history',
    routes
});