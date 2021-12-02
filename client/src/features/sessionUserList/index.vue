<template>
	<div id="session-users">
		<div class="header">Bro's in session</div>
		<div class="users">
			<div class="user" v-for="(bro, index) in inSession" :key="bro">
				<div style="line-height:2;font-weight:500;display:flex;align-items:center;">
					<span
						style="width:23px;height:23px;border-radius:40px;display:flex;"
						:style="coderIsTyping === bro ? 'background:#c7094a!important' : ''"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="15px"
							style="margin:auto;"
							viewBox="0 0 24 24"
							width="15px"
							fill="#fff"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
							/>
						</svg> </span
					>Bro {{ index + 1 }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { inSession, coderIsTyping } from '@/handlers/globalStates';

export default defineComponent({
	setup() {
		return {
			inSession,
			coderIsTyping,
		};
	},
});
</script>

<style scoped lang="scss">
#session-users {
	width: 150px;
	.header {
		padding: 12px 10px;
		width: 100%;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.623);
		font-family: 'Roboto';
	}
	.users {
		.user {
			padding: 6px 10px;
			display: flex;
			align-items: center;
			width: 100%;
			font-size: 12px;
			color: #fff;
			span {
				margin-right: 10px;
				font-size: 12px;
				color: #fff;
				background: #006887;
			}
			.typing {
			}
		}
	}
}
</style>
