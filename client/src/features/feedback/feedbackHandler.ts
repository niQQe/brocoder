
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';


let intervalId: number

const feedbackExpireTime = 7000

export const feedbacks = ref([])

watch(() => feedbacks, () => {
    if (feedbacks.value.length) startFeedbackHandler()
    else clearInterval(intervalId)
}, { deep: true })

const startFeedbackHandler = () => {
    intervalId = setInterval(() => {
        checkForExpiredFeedbacks()
    }, 500);
}

const checkForExpiredFeedbacks = () => {
    const currentTime = Date.now();
    feedbacks.value.forEach((feedback, index) => {
        const hasExpired = currentTime > feedback.expireTime! && !feedback.persistent
        if (hasExpired) removeFeedback(index)
    })
}

const generateExpireTime = () => Date.now() + feedbackExpireTime

const setFeedback = (feedback: any) => {
    feedbacks.value.push({ ...feedback, expireTime: generateExpireTime(), id: uuidv4() })
}

const removeFeedback = (index: number) => feedbacks.value.splice(index, 1)

export default { setFeedback, feedbacks: feedbacks.value }