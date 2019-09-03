const express = require('express');
const fs = require('fs');
const app = express();

let listadoTransaccion = [];
let listadoPersona = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoTransaccion);
    fs.writeFile('db/transaction.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}
const cargarTransaccionDB = () => {
    try {
        listadoTransaccion = require('../db/transaction.json');
    } catch (error) {
        listadoTransaccion = [];
    }
    //console.log(listadoPorHacer);
}
const crear = (monto, tipotransaccion) => {
    //[{ "id": 1, "monto": 0, "tipotransaccion": 1, "idpersona": 1 }]
    cargarTransaccionDB();
    let LastId = listadoTransaccion[listadoTransaccion.length - 1].id + 1;
    let codpersona = 1;
    let porHacer = {
        id: LastId,
        monto,
        tipotransaccion,
        idpersona: codpersona
    }
    listadoTransaccion.push(porHacer);
    guardarDB();
    return porHacer;
}
const getListado = () => {
        cargarTransaccionDB();
        return listadoTransaccion;
    }
    // const actualizar = (descripcion, completado = true) => {
    //     cargarDB();
    //     let index = listadoPorHacer.findIndex(tarea => {
    //         return tarea.descripcion === descripcion;
    //     });
    //     if (index >= 0) {
    //         listadoPorHacer[index].completado = completado;
    //         guardarDB();
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // const borrar = (descripcion) => {
    //     cargarDB();
    //     let nuevoListado = listadoPorHacer.filter(tarea => {
    //         return tarea.descripcion !== descripcion;
    //     });
    //     if (listadoPorHacer.length == nuevoListado.length) {
    //         return false;
    //     } else {
    //         listadoPorHacer = nuevoListado;
    //         guardarDB();
    //         return true;
    //     }
    // }

app.post('/listatransacciones', (req, res) => {
    res.json({
        ok: true,
        listado: getListado()
    });
});
app.post('/guardar', (req, res) => {
    let lresul = crear(50, 1);
    res.json({
        ok: true,
        listado: lresul
    });
});

module.exports = app;
// module.exports = {
//     crear,
//     getListado,
//     actualizar,
//     borrar
// }