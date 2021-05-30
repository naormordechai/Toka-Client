import router from '../router';

export default {
	namespaced: true,
	state: {
		connection: null,
		isLoadingConnection: false,
		cities: [],
		criteriesFilter: [],
		citiesFilter: [],
		isLoadingCities: false,
		criteria: {
			criteries: [],
			cities: [],
			term: ''
		}
	},
	getters: {
		isLoadingConnection(state) {
			return state.isLoadingConnection;
		},
		connection(state) {
			return state.connection;
		},
		citiesToShow(state) {
			return state.cities
				.filter((city) => {
					if (state.criteria.criteries.length > 0) {
						return state.criteria.criteries.includes(city.criteria);
					}
					return true;
				})
				.filter((city) => {
					if (state.criteria.cities.length > 0) {
						return state.criteria.cities.includes(city.name);
					}
					return true;
				})
				.filter((city) => {
					let { term } = state.criteria;
					term = term?.toLowerCase();
					if (term.trim().length > 0) {
						return city.name.toLowerCase().includes(term) || city.criteria.toString().includes(term) || city.description.toLowerCase().includes(term);
					}
					return true;
				});
		},
		isLoadingCities(state) {
			return state.isLoadingCities;
		},
		criteriesFilter(state) {
			return state.criteriesFilter;
		},
		citiesFilter(state) {
			return state.citiesFilter;
		}
	},
	mutations: {
		setConnection(state, url) {
			setTimeout(() => {
				state.connection = new WebSocket(`ws://${url}`);
				state.isLoadingConnection = true;
			}, 2000);
		},
		setCities(state, { cities }) {
			state.cities = cities;
		},
		setIsLoadingCities(state, { isLoading }) {
			state.isLoadingCities = isLoading;
		},
		setCriteria(state, newCriteria) {
			state.criteria = {
				...state.criteria,
				...newCriteria
			};
			console.log(state.criteria);
		},
		setFilters(state, { key, filterBy }) {
			state[key] = [...new Set(state.cities.map((city) => city[filterBy]))];
		}
	},
	actions: {
		loadCities({ commit, state }, message) {
			commit({ type: 'setIsLoadingCities', isLoading: true });
			setTimeout(() => {
				if (state.connection) {
					state.connection.send(message);
					state.connection.onmessage = ({ data }) => {
						const cities = JSON.parse(data);
						commit({ type: 'setCities', cities });
						commit({ type: 'setIsLoadingCities', isLoading: false });
						commit({ type: 'setFilters', key: 'criteriesFilter', filterBy: 'criteria' });
						commit({ type: 'setFilters', key: 'citiesFilter', filterBy: 'name' });
						router.push('/cities');
					};
				}
			}, 1500);
		}
	}
};
