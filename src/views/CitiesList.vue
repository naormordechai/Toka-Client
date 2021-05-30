<template>
	<section class="container">
		<div class="search-input-box">
			<search-filter v-model="term"></search-filter>
		</div>
		<div class="wrapper">
			<div class="list-section">
				<h2>{{ citiesToShow.length }} Found</h2>
				<city-row v-for="city in citiesToShow" :key="city.id" :city="city"></city-row>
			</div>
			<div class="filter-section">
				<h2>Criteria</h2>
				<div v-for="criteria in criteriesFilter" :key="criteria">
					<input type="checkbox" :value="criteria" v-model="criteries" />
					Criteria {{ criteria }}
				</div>
				<h2>City</h2>
				<div v-for="city in citiesFilter" :key="city">
					<input type="checkbox" :value="city" v-model="cities" />
					{{ city }}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CityRow from '../components/cties/CityRow.vue';
import SearchFilter from '../components/filter/SearchFitler.vue';

export default {
	components: { CityRow, SearchFilter },
	data() {
		return {
			criteries: [],
			cities: [],
			term: ''
		};
	},
	computed: {
		...mapGetters('cities', { citiesToShow: 'citiesToShow', citiesFilter: 'citiesFilter', criteriesFilter: 'criteriesFilter' })
	},
	methods: {
		...mapMutations('cities', ['setCriteria'])
	},
	created() {
		if (this.citiesToShow.length === 0) {
			this.$router.replace('/');
		}
	},
	watch: {
		criteries(criteries) {
			this.setCriteria({ criteries });
		},
		cities(cities) {
			console.log(cities);
			this.setCriteria({ cities });
		},
		term(term) {
			this.setCriteria({ term });
		}
	}
};
</script>

<style lang="less" scoped>
.container {
	padding: 0 12px;
	.search-input-box {
		display: flex;
		justify-content: center;
		margin: 24px 0;
		.search-input {
			width: 300px;
			height: auto;
			padding: 12px;
			outline: none;
			border: 1px solid #000;
			border-radius: 5000px;
			&:focus {
				border: 1px solid lightblue;
			}
		}
	}
	h2 {
		border-bottom: 1px solid #2f383c;
		padding-bottom: 12px;
	}

	.wrapper {
		display: grid;
		grid-template-columns: 60% 1fr;
		gap: 46px;
		@media (max-width: 600px) {
			grid-template-columns: auto;
			.list-section {
				order: 2;
			}
			.filter-section {
				order: 1;
			}
		}
	}
}
</style>
