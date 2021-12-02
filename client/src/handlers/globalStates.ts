import { ref } from 'vue'

export const roomId = ref()
export const code = ref('')
export const theme = ref('solarized_dark')
export const socket = ref() as any
export const outputs = ref([]);
export const inSession = ref([])
export const coderIsTyping = ref()
export const socketId = ref()
export const chatMessages = ref([])
export const mousePositions = ref([])
export const mouseTraceEnabled = ref(false);
