const express = require('express');
const app = express();
const tran = require('../models/transaccion');

app.post('/listatransacciones', (req, res) => {
    res.json({
        ok: true,
        listado: tran.getListado()
    });
});
app.post('/guardar', (req, res) => {

    // console.log(req.body.monto);
    var lresul = tran.crear(req.body.monto, req.body.tipotransaccion);
    res.json({
        ok: true,
        result: lresul,
        listado: tran.getListado()
    });
});

module.exports = app;
//     app,
//     crear,
//     getListado,
//     actualizar,
//     cargaInicial,
//     saldoActual
// }

// module.exports = crear;
// module.exports = getListado;
// module.exports = actualizar;
// module.exports = cargaInicial;
// module.exports = saldoActual;