import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import {router} from "../routers.js"
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usersLoaded: [],
		token: localStorage.getItem('token') | null
	},
	mutations: {
		getUsers (state, users) {
			state.usersLoaded = users
		},
		setUser (state, user) {
			state.usersLoaded.push(user)
		},
		userEdit(state, user) {
			state.usersLoaded.splice(user.index, 1, user.user)
		},
		userDelete(state, index) {
			state.usersLoaded.splice(index, 1)
		},
		setToken (state, token) {
			state.token = token
		},
		destroyToken (state) {
			state.token = null
		}
	},
	actions: {
		getUsers ({commit}, users) {
			return axios.get('https://admin-b3f80.firebaseio.com/users.json')
				.then(res => {
					if (!res.data) res.data={}
					const usersArray = []
					Object.keys(res.data).forEach(key => {
						usersArray.push( { ...res.data[key], id:key })
					})
					commit('getUsers', usersArray)
				})
				.catch(e=> console.log(e))
		},
		setUser({commit}, user) {
			return axios
				.post(`https://admin-b3f80.firebaseio.com/users.json`, user)
				.then(res => commit('setUser', { ...user, id: res.data.name } ))
				.catch(e => console.log(e))
		},
		userEdit({commit}, user) {
			return axios
				.put(`https://admin-b3f80.firebaseio.com/users/${user.user.id}.json`, user.user)
				.then(res => commit('userEdit', user))
				.catch(e => console.log(e))
		},
		userDelete({commit}, user) {
			return axios
				.delete(`https://admin-b3f80.firebaseio.com/users/${user.row.id}.json`, user)
				.then(res => commit('userDelete', user.index))
				.catch(e => console.log(e))
		},
		authUser ({commit}, authData) {
			const key ='AIzaSyBpSbV6fwxOS7BLtrN9OlVQOLuyiURBdbI'
			return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
				email: authData.email,
				password: authData.pass,
				returnSecureToken: true
			})
			.then((res) => {
				router.push('/admin')
				let token = res.data.idToken
				commit('setToken', token)

				// to local storage
				localStorage.setItem('token', token)
			})
			.catch(e => console.log('Пароль и email не найден!'))
		},
		logoutUser ({commit}) {
			commit('destroyToken')
			localStorage.removeItem('token')
			router.push('/')
		}
	}
})