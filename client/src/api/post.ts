
import feedbackHandler from '@/features/feedback/feedbackHandler'

export const post = async (payload) => {
    try {
        // const res = await fetch('http://localhost:5000/exec', {
        const res = await fetch('https://brocoder-api.herokuapp.com/exec', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (res.status === 429) {
            feedbackHandler.setFeedback({ message: 'Too many requests.', type: 'error' })
        }

    } catch (err) {
        console.log(err)
    }


}