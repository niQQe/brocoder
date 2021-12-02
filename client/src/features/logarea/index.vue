<template>
	<div class="output-area">
		<div style="padding:13px;color:rgb(255 255 255 / 50%);font-size:13px;display:flex;align-items:center;">
			<span>output</span>
			<div style="margin-left:auto;cursor:pointer;" @click="clearLog">
				<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
				</svg>
			</div>
		</div>
		<div class="output-container">
			<div v-for="value in outputs" :key="value" class="output">
				<div class="log message" v-if="value.output.logs.length" style="overflow-wrap: break-all;word-break:break-word">
					<div v-for="(logs, index) in value.output.logs" :key="index" style="float:left;width:100%;display:flex;">
						<div style="float:left;width:100%;display:flex;">
							<div>
								<svg
									style="margin-top:2px; margin-right:8px;"
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 0 24 24"
									width="14px"
									fill="#000000"
								>
									<path d="M0 0h24v24H0V0z" fill="none" />
									<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="rgb(165, 159, 128)" />
								</svg>
							</div>
							<code style="line-height:1.5;"> {{ logs }}</code>
						</div>
						<div style="min-width:65px;text-align:right;margin-top:0px;font-size:10px;margin-top:2px;opacity:60%;">
							{{ value.output.performance.toFixed(2) }} ms
						</div>
					</div>
				</div>

				<div class="error message" v-if="value.output.errors">
					<div style="float:left;width:100%;display:flex;align-items:center;">
						<div style="margin-right:auto;display:flex;align-items:center;">
							<svg
								style="margin-top:2px; margin-right:8px;"
								xmlns="http://www.w3.org/2000/svg"
								height="14px"
								viewBox="0 0 24 24"
								width="14px"
								fill="#000000"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="rgb(209, 104, 104)" />
							</svg>
							<code style="line-height:1.5;">{{ value.output.errors }}</code>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { outputs, theme } from '@/handlers/globalStates';
import { clearLog } from '@/handlers/globalActions';
</script>

<style scoped lang="scss">
.error {
	color: rgb(209, 104, 104);
	float: left;
	width: 100%;
	overflow-wrap: break-all;
	word-break: break-word;
	background: rgba(255, 0, 0, 0.063);
}

.log {
	color: #fff;
	background: rgba(165, 159, 128, 0.049);
}

.output-container {
	float: left;
	width: 100%;
	border-bottom: 1px solid #16424f;
}

.output {
	float: left;
	width: 100%;
}

.message {
	flex-direction: column;
	font-size: 12px;
	border-top: 1px solid rgb(22, 66, 79) !important;
	padding: 10px 13px 10px 10px;
	display: flex;
	align-items: center;
	float: left;
	width: 100%;
}
</style>
