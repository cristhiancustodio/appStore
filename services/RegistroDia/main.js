import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { ObtenerMes, sumarArray } from "../../utils/helpers";
import { database } from "../fb";



class RegistroDiario {

    static coleccion = (standar = 'registro_dia') => {

        return collection(database, standar);
    }
    static documento = (id, standar = 'registro_dia') => {

        return doc(database, standar, id);
    }

    static async validacionRegistroDiario(dia) {

        const q = query(collection(database, 'valida_diario'),
            where('dia', "==", dia)
        );
        const result = await getDocs(q);
        const lista = [];
        result.forEach((doc) => {
            lista.push({ id: doc.id, ...doc.data() });
        });
        if (lista.length > 0) {
            return true;
        }
        return false;
    }

    static async registrarDia(data) {
        try {
            /*let validacion = await this.validacionRegistroDiario(data.fecha);
            if (validacion) {
                throw new Error("Ya hay un registro con esta fecha");
            }*/

            const resultado = await addDoc(RegistroDiario.coleccion(), data);
            if (resultado.id) {
                let res = addDoc(collection(database, 'valida_diario'), {
                    dia: data.fecha,
                    create_at: new Date
                });
            }
            return {
                error: false,
                mensaje: 'Se registro correctamente',
                respuesta: resultado,
                id: resultado.id || 0
            }
        } catch (error) {
            return {
                error: true,
                mensaje: 'Ocurrio un error',
                mensaje2: error.message,
                id: 0
            }
        }
    }

    static async obtenerMisVentasAnuales(anio) {
        if(typeof anio === 'undefined' || anio == null || anio == ''){
            anio = (new Date()).getFullYear().toString();
        }
        try {
            const q = query(RegistroDiario.coleccion(),
                where("date.anio", "==", anio), 
                //where("fecha", ">=", `${anioMesPrefijo}01`),
                //where("fecha", "<", `${anio}-${mes < 9 ? '0' + (mes + 1) : mes + 1}-01`),
                orderBy("createAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            let items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ganancia_diaria: (doc.data().ganancia_diaria || 0),
                fecha: doc.data().date
            }));

            let listado = [];

            /**AQUI NO HAGO CONSULTA, SOLO OBTENGO TODO Y SEPARO LOS DATOS POR MES Y ANIO */
            items.forEach((item, indice) => {
                const grupo_existe = listado.find((e) => e.mes == item.fecha.mes);

                if (grupo_existe) {
                    grupo_existe.detalle.push({
                        //id: item.id,
                        ganancia_diaria: item.ganancia_diaria,
                    })
                } else {
                    listado.push({
                        anio: item.fecha.anio,
                        descripcion_mes: ObtenerMes(item.fecha.mes - 1),
                        mes: item.fecha.mes,
                        detalle: [{
                            //id: item.id,
                            ganancia_diaria: item.ganancia_diaria,
                        }],
                        total_mes: 0
                    })
                }
            });

            const ordenado = listado.sort((a, b) => a.mes - b.mes);

            let resultado = ordenado.map((item) => {
                item.total_mes = sumarArray(item.detalle, 'ganancia_diaria');
                return item;
            })
            
            return {
                error: false,
                items: resultado
            }
        } catch (error) {
            console.log(error);
            return {
                error: true,
                items: [],
                message: error.message
            }
        }
    }
    static async obtenerMisVentasMensuales(anio = 2024, mes) {
        try {
            const q = query(RegistroDiario.coleccion(),
                where("date.anio", "==", anio),
                where("date.mes", "==", mes),
            );

            const querySnapshot = await getDocs(q);
            let items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                dia: parseInt(doc.data().date.dia),
                ...doc.data()
            }));

            items.sort((a, b) => b.dia - a.dia);

            let listado = {
                anio: anio,
                mes: mes,
                dia: '',
                data: items
            };
            return {
                error: false,
                items: listado
            }
        } catch (error) {

            return {
                error: true,
                items: [],
                msg_error: error.message
            }
        }
    }

    static async obtenerVenta(id) {

        try {
            let data = await getDoc(RegistroDiario.documento(id));

            if (data.exists()) {
                return {
                    error: false,
                    item: data.data()
                }
            } else {
                throw new Error("No se encontro los datos");

            }
        } catch (error) {
            console.log(error);

            return {
                error: true,
                items: []
            }
        }
    }
    static async eliminarRegistroDia(id){
        try {
            
            let res = await deleteDoc(RegistroDiario.documento(id));
            if(res){
                return {
                    error: false,
                    message: 'Eliminado correctamente'
                }
            }
            return {
                error: true,
                message: 'Ocurrio un error'
            }
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
            
        }
    }
}

export default RegistroDiario;