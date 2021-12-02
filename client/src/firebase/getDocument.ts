import { projectFirestore } from "./config";
import { doc, getDoc } from "firebase/firestore";
import { validate as uuidValidate } from 'uuid';
import { code } from '@/handlers/globalStates'

const getDocument = async (id: any, callback: any) => {
    if (!uuidValidate(id)) return
    const docRef = doc(projectFirestore, "code", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        callback(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        code.value = "console.log('WELCOME TO BROCODER! TO RUN YOUR CODE PRESS CTRL+R. TO SAVE YOUR CODE PRESS CTRL+S')"
    }
}

export default getDocument

