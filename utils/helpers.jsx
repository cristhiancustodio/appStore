export function decimales(value, decimales = 2) {
    if (isNaN(value) || value === '') {
        const n = 0;
        return n.toFixed(decimales);
    }
    let numero = parseFloat(value);
    let decimal = numero.toFixed(decimales);
    return decimal;
}
export const listaMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export function ObtenerMes(posicion) {
    return listaMeses[posicion] || '';
}

function fechaHoy() {
    const hoy = new Date();
    const dia = AgregaCeroNumero((hoy.getDate()).toString()); // Día del mes (1-31)
    const mes = AgregaCeroNumero((hoy.getMonth() + 1).toString()); // Mes (0-11, por eso sumamos 1)
    const anio = hoy.getFullYear(); // Año completo
    return {
        dia: dia,
        mes: mes,
        anio: anio,
    }
}

/**EL VALOR QUE VIENE SIEMPRE TIENE QUE SER STRING PARA QUE RECONOZCA EL valor.length */
function AgregaCeroNumero(valor){
    if(valor >= 1 && valor < 10 && valor.length == 1){
        return '0' + valor;
    }
    return valor;
}



export function formatFecha(fecha, tipo, separador = '/'){

    if(tipo == 'es'){
        let [year, month, day] = fecha.split("/");
        day = AgregaCeroNumero(day);
        month = AgregaCeroNumero(month);
        return [day, month, year].join(separador);
    }else if(tipo == 'en'){
        let [day, month, year] = fecha.split("/");
        day = AgregaCeroNumero(day);
        month = AgregaCeroNumero(month);
        return [year, month, day].join(separador);

    }else{
        let [val1, mes, val2] = fecha.split("/");
        
        val1 = AgregaCeroNumero(val1);
        mes = AgregaCeroNumero(mes);
        val2 = AgregaCeroNumero(val2);
        return [val1, mes, val2].join(separador);
    }
}

export function fechaHoyText(fecha = '') {
    const today = fecha != '' ? new Date(fecha) : new Date();
    today.setDate(today.getDate() + 1); // Aumentamos un día
    const options = {
        weekday: 'long', // Nombre del día completo
        day: 'numeric',  // Día del mes
        month: 'long',   // Nombre completo del mes
        year: 'numeric'  // Año con cuatro dígitos
    };

    const formattedDate = today.toLocaleDateString('es-ES', options);

    return formattedDate;
}
export function fechaHoyEn(separador = '/') {
    let { dia, mes, anio } = fechaHoy();

    return [anio, mes, dia].join(separador);

}
export function fechaHoyEs(separador = '/') {
    let { dia, mes, anio } = fechaHoy();

    return [dia, mes, anio].join(separador);
}
export const sumarArray = (lista, campo) => {
    let suma = 0
    lista.forEach(element => {
        suma += parseFloat(element[campo]);
    });
    return suma;
}