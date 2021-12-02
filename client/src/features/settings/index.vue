<template>
	<div class="settings-container">
		<div class="settings">
			<select name="" id="" v-model="theme">
				<option value="solarized_dark">Solarized dark</option>
				<option value="gruvbox">Gruvbox</option>
			</select>
			<div class="button-container">
				<button @click="$emit('closeSettings')">close</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { theme } from '@/handlers/globalStates';
</script>

<style scoped lang="scss">
.button-container {
	width: 100%;
	float: left;
	margin-top: 20px;
}

button {
	cursor: pointer;
	float: right;
	background: #c7094a;
	color: #fff;
	padding: 7px 10px;
	border-radius: 4px;
	text-transform: uppercase;
	font-size: 13px;
	font-weight: 600;
	font-family: 'Roboto';
	border: none;
	&:hover {
		background: #e80756;
	}
}
</style>
