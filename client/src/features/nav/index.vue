<template>
	<nav style="display:flex;align-items:center;padding:0px 10px;position:fixed;top:0;left:0;width:100%;padding:0px 50px;">
		<div style="float:left;display:flex;items:center;" class="logo">
			<span style="font-size:12px;font-weight:600;margin-right:10px;">{{ logo }}</span> brocoder
		</div>
		<div style="margin-left:auto;">
			<button @click="saveCode($route.params.id)" style="cursor:pointer">
				Save
			</button>
		</div>
	</nav>
</template>

<script setup>
import { saveCode } from '@/handlers/globalActions';

const logo = '(-_(-_-)_-)';
</script>

<style lang="scss" scoped>
nav {
	height: 50px;
	color: rgb(177, 177, 177);
	font-weight: 700;
	font-size: 11px;
}
.logo {
	font-family: 'Roboto';
	color: #83b6f8;
	font-weight: 600;
	font-size: 14px;
}
button {
	font-family: 'Roboto';
	letter-spacing: 1px;
	background: #1a73e8;
	border-radius: 6px;
	padding: 5px 10px;
	border: none;
	font-weight: 500;
	color: #fff;
	font-size: 12px;
}
</style>
