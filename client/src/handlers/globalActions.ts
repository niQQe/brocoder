import { outputs, code, roomId, socket } from '@/handlers/globalStates'
import { io } from "socket.io-client";
import useCollection from '@/firebase/useCollection'
import socketListeners from './socketListeners';
const { set } = useCollection()

export const clearLog = () => {
    outputs.value = []
    console.log();
}

export const saveCode = async (id: string) => {
    await set({ code: code.value, id }, id)
}

/**
 * Connect to socket
 * @param {any} id id of room
 * calls {@link socketListeners} for creating socketlisteners.
 */
export const establishSocketConnection = (id: any) => {
    roomId.value = id
    // socket = io("http://localhost:5000", {
    socket.value = io("https://brocoder-api.herokuapp.com/", {
        reconnectionDelayMax: 10000,
        query: {
            roomId: id
        }
    })
    socketListeners()
}