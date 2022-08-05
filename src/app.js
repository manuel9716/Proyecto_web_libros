const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//setting
app.set('port', 5000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');// ejs es un lenguje que me permite incluir js dentro del html

//middlewares son funciones que se ejecutan antes de que lleguen a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})) //con urlencoded vamos a entender los datos y a su vez los convierte en tipo json para utilizarlos

//rutas
app.use(require('./routes/index'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//404 handler
app.use((req, res , next) =>{
    res.status(404).send('404 Not found');
})
module.exports = app;