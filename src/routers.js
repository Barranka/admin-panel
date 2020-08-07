//default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//Pages
import Auth from '@/pages/Auth'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/404'

//Routering
export const router = new Router({
	// mode: 'history',
	base: "./",
	scrollBehavior: () => ({ x: 0, y: 0 }),
	routes: [
		{
			path: '/',
			name: 'auth',
			component: Auth
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin
		},
		{
			path: '*',
			name: 'notFound',
			component: NotFound
		}
	]
})
