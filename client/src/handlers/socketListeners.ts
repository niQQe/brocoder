import {
    socket,
    code,
    socketId,
    roomId,
    outputs,
    mousePositions,
    inSession,
    coderIsTyping,
    chatMessages
} from '@/handlers/globalStates'

import feedbackHandler from '@/features/feedback/feedbackHandler';
import socketEmitters from './socketEmitters';
import { watch } from 'vue'


const socketListeners = () => {
    const { emitCode } = socketEmitters()

    socket.value.on('connect', () => {
        console.log('connected')
        socketId.value = socket.value.id
    })

    let watcher = watch(code, (val) => {
        emitCode(val)
        socket.value.emit('code-payload', { code: val, id: roomId.value, coder: socket.value.id })
    })

    socket.value.on('code-payloadr', (payload) => {
        watcher()
        code.value = payload.code
        watcher = watch(code, (val) => {
            emitCode(val)
        })
    })

    socket.value.on('output-payload', (payload) => {
        outputs.value.push(payload)
    })

    socket.value.on('in-session', (payload) => {
        if (payload.message.length < inSession.value.length) {
            mousePositions.value = mousePositions.value.filter(user => payload.message.includes(user.socketId))
            feedbackHandler.setFeedback({ message: 'A bro left the session.', type: 'message' })

        } else if (inSession.value.length && payload.message.length > 1) {
            feedbackHandler.setFeedback({ message: 'A bro joined the session.', type: 'message' })
        }
        inSession.value = payload.message
    })

    socket.value.on('coder-typing', (payload) => {
        coderIsTyping.value = payload.message
    })

    socket.value.on('session-chat-message', payload => {
        console.log(payload)
        chatMessages.value.unshift(payload)

    })

    socket.value.on('user-cursor-position', payload => {
        const userIndex = mousePositions.value.findIndex(user => user.socketId === payload.message.socketId)
        if (userIndex !== -1) {
            mousePositions.value[userIndex].x = payload.message.x
            mousePositions.value[userIndex].y = payload.message.y

        } else {
            mousePositions.value.push(payload.message)
        }
    })

    socket.value.on('user-stop-cursor-position', (payload) => {
        mousePositions.value = mousePositions.value.filter(user => user.socketId !== payload.socketId)
    })

}

export default socketListeners