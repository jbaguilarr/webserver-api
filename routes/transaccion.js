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
const cargarPersonaDB = () => {
    try {
        listadoPersona = require('../db/persona.json');
    } catch (error) {
        listadoPersona = [];
    }
    //console.log(listadoPorHacer);
}
const crear = (montox, xtipotransaccion) => {
    //[{"id":1,"monto":0,"tipotransaccion":1,"idpersona":1,"fecha":"03/09/2019","saldo":0}]
    cargarTransaccionDB();
    cargarPersonaDB();
    let LastId = listadoTransaccion.length == 0 ? 1 : listadoTransaccion[listadoTransaccion.length - 1].id + 1;
    let codpersona = 1;
    let d = new Date();
    let strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

    let saldopersona = listadoPersona[0].saldo;


    let saldofinal = actualizar(xtipotransaccion, montox, saldopersona);

    let porHacer = {
        id: LastId,
        monto: montox,
        tipotransaccion: xtipotransaccion,
        idpersona: codpersona,
        fecha: strDate,
        saldo: saldofinal
    }
    listadoTransaccion.push(porHacer);
    guardarDB();
    listadoPersona[0].saldo = saldofinal;
    guardarPersonaDB();
    return porHacer;
}

const actualizar = (tipotransaccion, monto, saldo) => {
    let saldototal = Number(0);
    if (tipotransaccion == 1) {
        saldototal = Number(saldo) + Number(monto);
    } else if (tipotransaccion == 2) {
        saldototal = Number(saldo) - Number(monto);
    }

    return saldototal;
}
const getListado = () => {
    cargarTransaccionDB();
    //console.log(listadoTransaccion);
    return listadoTransaccion;
}


//persona
const guardarPersonaDB = () => {
    let data = JSON.stringify(listadoPersona);
    fs.writeFile('db/persona.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}
const actualizarSaldoPersona = (saldo) => {
    cargarPersonaDB();

    listadoPersona[0].saldo = saldo;
    guardarPersonaDB();

}

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

    // console.log(req.body.monto);
    let lresul = crear(req.body.monto, req.body.tipotransaccion);
    res.json({
        ok: true,
        result: lresul,
        listado: getListado()
    });
});

module.exports = app;
// module.exports = {
//     crear,
//     getListado,
//     actualizar,
//     borrar
// }