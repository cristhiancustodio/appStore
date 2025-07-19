import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "./fb";

class Model {

    nombre_coleccion = null;
    
    static coleccion = () => {
        return collection(database, this.nombre_coleccion);
    }
    static documento = (id) => {
        return doc(database, this.nombre_coleccion, id);
    }
}

export default Model;