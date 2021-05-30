<template>
	<div class="row">
		<div class="avatar"></div>
		<div class="details">
			<h5>{{city.name}}</h5>
			<span>{{city.description}}</span>
		</div>
		<div class="criteria">Criteria {{city.criteria}}</div>
	</div>
</template>

<script>
export default {
	props: ['city']
};
</script>

<style lang="less" scoped>
	.row {
		display: grid;
		grid-template-columns: 50px 200px 1fr;
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid #2f383c;
		align-items: center;
		.avatar {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #232e37;
		}
		.details {
			h5 { margin: 0; }
			span { font-size: 12px; color: #6E7477;}
		}
		.criteria {
			justify-self: end;
			border: 1px solid #232e37;
			padding: 6px 12px;
			font-size: 12px;
			border-radius: 5px;
			color: #6E7477;
		}
	}
</style>
