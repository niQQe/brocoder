import { ref } from 'vue'

const useResize = () => {
    const width = ref()
    const handleResize = (e) => {
        width.value = e.x;
    };

    const addMouseMoveListener = () => {
        document.addEventListener('mousemove', handleResize);
    };
    const handleRemoveListener = () => {
        document.removeEventListener('mousemove', handleResize);
    };
    document.addEventListener('mouseup', handleRemoveListener);

    return {
        handleResize,
        addMouseMoveListener,
        handleRemoveListener,
        width
    }
}

export default useResize