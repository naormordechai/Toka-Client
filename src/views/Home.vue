<template>
	<div class="container">
		<splash-component v-if="!isLoadingConnection"></splash-component>
		<v-spinner v-if="isLoadingCities"></v-spinner>
		<button v-else class="btn-connect" @click="connectWebSocket()">Start</button>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SplashComponent from '../components/UI/SplashComponent.vue';
import VSpinner from '../components/UI/VSpinner.vue';
export default {
	components: { SplashComponent, VSpinner },
	name: 'Home',
	methods: {
		...mapMutations('cities', ['setConnection']),
		...mapActions('cities', { loadCities: 'loadCities' }),
		connectWebSocket() {
			this.loadCities();
		}
	},
	computed: {
		...mapGetters('cities', { isLoadingConnection: 'isLoadingConnection', connection: 'connection', isLoadingCities: 'isLoadingCities' })
	},
	created() {
		this.setConnection('localhost:3000');
	}
};
</script>

<style lang="less" scoped>
.container {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.btn-connect {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		outline: none;
		border: 1px solid #2f383c;
		color: #fff;
		text-transform: uppercase;
		font-size: 24px;
		cursor: pointer;
		background-color: #232e37;
		transition: 0.15s;
		&:hover {
			opacity: 0.8;
		}
		&:active {
			transform: scale(0.95);
		}
	}
}
</style>
