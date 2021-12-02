import { doc, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "./config";
import { ref } from 'vue'

const getSnapshot = () => {
    const get = async () => {
        const docs = ref() as any
        onSnapshot(doc(projectFirestore, "code", "jy2TLfSO5TZLhfDDncxs"), (doc: any) => {
            docs.value = doc.data()
        })
        return {
            docs
        }
    }


    return {
        get
    }
}

export default getSnapshot
