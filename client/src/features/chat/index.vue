<template>
	<div class="chat-container">
		<button class="chat-button" @click="toggleChat(true)">
			<div class="notification-dot" v-if="newMessages">
				{{ newMessageCount >= 10 ? '9+' : newMessageCount }}
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="24px" fill="#fff">
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h8v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"
				/>
			</svg>
		</button>
		<div class="chat-area" v-if="showChat">
			<button class="close-chat-button" @click="toggleChat(false)">
				<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="5 0 15 23" width="18px">
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
					/>
				</svg>
			</button>
			<div class="chat-messages-container">
				<div class="message" v-for="(row, index) in chatMessages" :key="index">
					<div class="user">{{ 'Bro ' + (inSession.findIndex((user) => user === row.socketId) + 1) }}:</div>
					<div class="text" :class="{ you: row.socketId === socketId }">{{ row.message }}</div>
				</div>
			</div>
			<div class="input-container">
				<input autofocus type="text" placeholder="Write a message" v-model="message" @keyup.enter="handleSendMessage" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { chatMessages, socketId, inSession } from '@/handlers/globalStates';
import { sendChatMessage } from '@/handlers/globalActions';
import socketEmitters from '@/handlers/socketEmitters';

const message = ref();

const newMessages = ref(false);
const newMessageCount = ref(0);

watch(
	() => chatMessages,
	() => {
		newMessageCount.value++;
		if (!showChat.value) newMessages.value = true;
	},
	{ deep: true }
);

const handleSendMessage = () => {
	const { sendChatMessage } = socketEmitters();
	sendChatMessage(message.value);
	message.value = '';
};

const toggleChat = (val) => {
	if (val) newMessages.value = false;
	showChat.value = val;
	newMessageCount.value = 0;
};

const showChat = ref(false);
</script>

<style scoped lang="scss">
.chat-container {
	position: fixed;
	left: 20px;
	bottom: 20px;
	z-index: 300;
	.notification-dot {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: -5px;
		right: -5px;
		border-radius: 10px;
		width: 20px;
		height: 20px;
		color: #fff;
		font-weight: 600;
		font-size: 13px;
		background: #c7094a;
	}
	.chat-button {
		width: 35px;
		cursor: pointer;
		border: none;
		display: flex;
		height: 35px;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.618);
		border-radius: 35px;
		svg {
			margin: auto;
		}
	}
	.chat-area {
		display: flex;
		flex-direction: column;
		width: 500px;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.131);
		opacity: 1;
		height: 400px;
		left: -10px;
		bottom: -10px;
		position: absolute;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-right-radius: 15px;
		padding: 40px 10px 10px 10px;
		.close-chat-button {
			width: 25px;
			height: 25px;
			border: none;
			border-radius: 25px;
			display: flex;
			position: absolute;
			right: 5px;
			top: 5px;
			font-size: 24px;
			cursor: pointer;
			svg {
				fill: rgba(255, 255, 255, 0.542);
				margin: auto;
			}
		}
		.chat-messages-container {
			height: 88%;
			max-height: 88%;
			overflow: auto;
			display: flex;
			align-items: flex-end;
			flex-direction: column-reverse;
			overflow: hidden;
			overflow-wrap: break-all;
			word-break: break-word;
			.message {
				display: flex;
				align-items: center;
				margin-top: 10px;
				border-radius: 30px;

				flex: 0;
				color: #fff;
				font-size: 13px;
				float: left;
				width: 100%;
				.user {
					min-width: 40px;
				}
				.text {
					padding: 7px 15px;
					background: #16424f;
					border-radius: 15px;
					margin-left: 10px;
					line-height: 1;
					&.you {
						background: #c7094a;
					}
				}
			}
		}
		.input-container {
			padding-top: 10px;
			input {
				padding: 0px 7px;
				color: #fff;
				border-radius: 3px;
				width: 100%;
				height: 100%;
				&:focus {
					outline: none;
				}
			}
			flex: 1;
			display: flex;
			align-items: center;
		}
	}
}
</style>
