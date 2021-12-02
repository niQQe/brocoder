<template>
	<div class="feedback-container">
		<transition-group name="list" tag="div">
			<!-- -->

			<div v-for="(feedback, index) in feedbacks" :key="index" :class="feedback.type" class="feedback">
				{{ feedback.message }}
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { feedbacks } from './feedbackHandler';
</script>

<style scoped lang="scss">
.feedback-container {
	position: fixed;
	bottom: 0px;
	width: 350px;
	padding: 20px;
	right: 0;
	display: flex;
	flex-direction: column;
	z-index: 999;
	.feedback {
		margin-left: auto;
		text-align: center;
		width: 100%;
		padding: 15px;
		border-radius: 10px;
		line-height: 1;
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		margin-top: 10px;
	}

	.list-item {
		display: inline-block;
		margin-right: 10px;
	}
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}

	.error {
		background: #870000;
	}
}
</style>
