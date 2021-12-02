<template>
	<v-ace-editor
		style="height:100%;flex:1;"
		class="test"
		:printMargin="false"
		:blockSelectEnabled="false"
		:enableBlockSelect="false"
		:highlightTagPending="false"
		:highlightActiveLine="false"
		ref="editor"
		v-model:value="code"
		lang="javascript"
		:theme="theme"
	/>
</template>

<script setup lang="ts">
import { code, theme } from '@/handlers/globalStates';
import { saveCode, establishSocketConnection } from '@/handlers/globalActions';
import { post } from '@/api/post';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VAceEditor } from 'vue3-ace-editor';
import getDocument from '@/firebase/getDocument';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-gruvbox';

ace.config.set('basePath', 'path');

const route = useRoute();

onMounted(async () => {
	establishSocketConnection(route.params.id);
	await getDocument(route.params.id, (data) => {
		code.value = data.code;
	});
});

const handleSave = async (e: any) => {
	if (e.key === 'r' && e.ctrlKey) {
		e.preventDefault();
		run();
	}
	if (e.key === 's' && e.ctrlKey) {
		console.log(route.params.id);
		e.preventDefault();
		await saveCode(route.params.id);
	}
};

window.addEventListener('keydown', handleSave);

const run = async () => {
	try {
		await post({ roomId: route.params.id, type: 'eval', code: code.value });
	} catch (e) {
		await post({ roomId: route.params.id, type: 'error', code: e });
	}
};
</script>
<style lang="scss">
/* width */
::-webkit-scrollbar {
	width: 10px;
	padding: 2px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
	border-right: 1px solid #16424f;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #206074;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #236a80;
}
.ace_layer {
	border-right: none;
	border-bottom: 1px solid rgba(255, 255, 255, 0.144) !important;
}

.ace_gutter {
	border-right: 1px solid rgba(255, 255, 255, 0.083) !important;
}
</style>
