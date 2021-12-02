<template>
	<router-view />
</template>

<script lang="ts">
export default {
	setup() {
		return {};
	},
};
</script>
<style lang="scss">
#app {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
		sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	flex: 1;
	float: left;
	min-height: 100%;
	width: 100%;
}

html {
	min-height: 100%;
	height: 100%;
}



* {
	box-sizing: border-box;
}


body {
	padding: 0px;
	background: #1d2021;
	display: flex;
	min-height:100%;
	margin:0;
	overflow:hidden;
}
</style>
