<template>
	<main style="width:100%;height:100vh;max-height:100%;display:flex;float:left;border:1px solid #2d2d2d" :class="theme">
		<settings-module @closeSettings="showSettings = false" v-if="showSettings"></settings-module>
		<div
			v-if="mousePositions.length"
			v-for="cursor in mousePositions"
			style="width:10px;height:10px;position:absolute;z-index:100;"
			:style="'top:' + cursor.y + 'px;' + 'left:' + cursor.x + 'px'"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				width="14"
				height="14"
				style="margin:auto;"
				viewBox="0 0 24 24"
			>
				<path
					fill="#fff"
					d="M13.75,10.19L14.38,10.32L18.55,12.4C19.25,12.63 19.71,13.32 19.65,14.06V14.19L19.65,14.32L18.75,20.44C18.69,20.87 18.5,21.27 18.15,21.55C17.84,21.85 17.43,22 17,22H10.12C9.63,22 9.18,21.82 8.85,21.47L2.86,15.5L3.76,14.5C4,14.25 4.38,14.11 4.74,14.13H5.03L9,15V4.5A2,2 0 0,1 11,2.5A2,2 0 0,1 13,4.5V10.19H13.75Z"
				/>
			</svg>
		</div>
		<div ref="userarea" class="user-area" :style="'width:' + width + 'px!important'">
			<div
				@mousedown.prevent.stop="addMouseMoveListener"
				style="position:absolute;width:2px;height:100%;right:0px;top:0px;cursor:e-resize;z-index:300"
			>
				<div class="resize-dot"></div>
			</div>
			<div class="nav">
				<div class="nav-content">
					<code>broCoder</code>
					<svg
						@click="showSettings = true"
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						style="margin-left:auto;cursor:pointer;"
						height="16px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#fff"
					>
						<g>
							<path d="M0,0h24v24H0V0z" fill="none" />
							<path
								d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
							/>
						</g>
					</svg>
				</div>
				<sessionUserList />
			</div>
			<code-area />
			<chat />
			<div @click="enableMouseTrace" :class="mouseTraceEnabled ? 'mousetrace-enabled' : ''" class="mouse-trace">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					width="24"
					height="24"
					style="margin:auto;"
					viewBox="0 0 24 24"
				>
					<path
						fill="#fff"
						d="M13.75,10.19L14.38,10.32L18.55,12.4C19.25,12.63 19.71,13.32 19.65,14.06V14.19L19.65,14.32L18.75,20.44C18.69,20.87 18.5,21.27 18.15,21.55C17.84,21.85 17.43,22 17,22H10.12C9.63,22 9.18,21.82 8.85,21.47L2.86,15.5L3.76,14.5C4,14.25 4.38,14.11 4.74,14.13H5.03L9,15V4.5A2,2 0 0,1 11,2.5A2,2 0 0,1 13,4.5V10.19H13.75Z"
					/>
				</svg>
			</div>
			<feedback />
		</div>
		<log-area style="box-shadow:0px 0px 0px #000;" />
	</main>
</template>

<script setup>
import { ref } from 'vue';
import { saveCode, mousePositions, mouseTraceEnabled, socketId, theme } from '@/handlers/globalStates';
import codeArea from '@/features/codearea/';
import settingsModule from '@/features/settings';
import chat from '@/features/chat';
import logArea from '@/features/logarea/';
import sessionUserList from '@/features/sessionUserList/';
import feedback from '@/features/feedback/';
import navbar from '@/features/nav/';
import socketEmitters from '@/handlers/socketEmitters';
import useResize from '@/composables/useResize';

const { emitCursorPosition, stopEmitCursorPosition } = socketEmitters();
const { handleResize, addMouseMoveListener, handleRemoveListener, width } = useResize();

const userarea = ref();

const showSettings = ref(false);

const handleMouseMove = (e) => {
	/** To prevent emit for every pixel */
	if (e.x % 3 !== 0 || e.y % 3 !== 0) return;
	emitCursorPosition(e.x, e.y);
};

const enableMouseTrace = () => {
	if (mouseTraceEnabled.value) {
		document.removeEventListener('mousemove', handleMouseMove);
		stopEmitCursorPosition();
		mouseTraceEnabled.value = false;
		return;
	}
	document.addEventListener('mousemove', handleMouseMove);
	mouseTraceEnabled.value = true;
};
</script>

<style lang="scss" scoped>
.user-area {
	float: left;
	display: flex;
	position: relative;
	width: 70%;
	max-width: 84% !important;
	min-width: 25% !important;
}

.mouse-trace {
	width: 35px;
	position: absolute;
	bottom: 18px;
	left: 80px;
	cursor: pointer;
	border: none;
	display: flex;
	z-index: 200;
	height: 35px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.618);
	border-radius: 35px;
}

.mousetrace-enabled {
	background: #c7094a !important;
}

.resize-dot {
	height: 15px;
	width: 4px;
	border-radius: 3px;
	top: calc(50% - 7px);
	position: absolute;
	left: 0px;
	z-index: 0;
}

.nav-content {
	color: #fff;
	font-size: 14px;
	padding: 10px 10px 10px 10px;
	display: flex;
	align-items: center;
	display: flex;
	align-items: center;
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
