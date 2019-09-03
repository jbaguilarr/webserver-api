const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

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
});