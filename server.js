const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//npm install hbs  -  Express HBS engine.
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//configuracion global de rutas
app.use(require('./routes/index'));




app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'Bruno'
    });
});
app.get('/about', (req, res) => {

    res.render('about');
});
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);


    var listadoTransaccion = []; //{ "id": 1, "monto": 0, "tipotransaccion": 1, "idpersona": 1, "fecha": "03/09/2019", "saldo": 0 }
    var data = JSON.stringify(listadoTransaccion);
    fs.writeFile('db/transaction.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });


    var listadopersona = [{ "id": 1, "nombre": "Jose Bruno", "app": "Aguilar", "apm": "Omonte", "cuenta": "825445362541", "saldo": 0 }];
    var datapersona = JSON.stringify(listadopersona);
    fs.writeFile('db/persona.json', datapersona, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
});