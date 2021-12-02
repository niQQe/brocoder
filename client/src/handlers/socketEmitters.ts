import { roomId, socket, } from '@/handlers/globalStates'

const socketEmitters = () => {
    const emitCode = (val: string) => {
        socket.value.emit('code-payload', { code: val, id: roomId.value, coder: socket.value.id })
    };
    const sendChatMessage = (message) => {
        socket.value.emit('chat-message', { message, roomId: roomId.value, socketId: socket.value.id })
    }
    const emitCursorPosition = (x, y) => {
        socket.value.emit('cursor-position', { message: { x, y }, roomId: roomId.value, socketId: socket.value.id })
    }
    const stopEmitCursorPosition = () => {
        socket.value.emit('stop-cursor-position', { roomId: roomId.value, socketId: socket.value.id })
    }
    return {
        emitCode,
        sendChatMessage,
        emitCursorPosition,
        stopEmitCursorPosition
    }
}

export default socketEmitters