import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { projectFirestore } from "@/firebase/config"
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const useCollection = () => {
    const add = async (data: any) => {
        await addDoc(collection(projectFirestore, 'code'), { ...data });
    }
    const set = async (data: any, uid: string) => {
        console.log(uid)
        if (!uuidValidate(uid)) return
        const test = await setDoc(doc(projectFirestore, "code", uid), { ...data });
        console.log(test)
    }

    return {
        add,
        set
    }
}

export default useCollection