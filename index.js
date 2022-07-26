import db from './config/db.js';
import express from 'express'; 
import router from './routes/index.js';

const app = express();

// Conectar base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada'))
    .catch( error => console.error('404 ERROR' + error))

    
// Definir el puerto
const port  = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine','pug');

// Obtener año actual
app.use( (req, res,next) =>{
    const year  = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes'
    // console.log(res.locals);
    return next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// agregar router
app.use('/',  router );


app.listen( port,() => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})