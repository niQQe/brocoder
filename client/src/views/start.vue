<template>
	<div style="width:100%;height:100vh;display:flex;"></div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';

const router = useRouter();

onBeforeMount(() => {
	router.push(`/session/${uuidv4()}`);
});
</script>

<style lang="scss" scoped>
button {
	text-transform: uppercase;
	background: rgb(110, 63, 196);
	color: #fff;
	border: none;
	border-radius: 3px;
	padding: 5px 7px;
	cursor: pointer;
	letter-spacing: 0.5px;
	font-size: 13px;
	font-family: 'Roboto';
	font-weight: 500;
}
</style>
