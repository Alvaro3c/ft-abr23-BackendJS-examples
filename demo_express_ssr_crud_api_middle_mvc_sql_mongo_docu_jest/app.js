const express = require('express')
const cowsay = require('cowsay')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('./utils/db_mongo') // Conexión a BBDD MongoDB

const calculator = require('./utils/calculator')
const morgan = require('./utils/morgan')
const error404 = require('./middlewares/error404')

// Módulos de Rutas
const booksRoutes = require('./routes/booksRoutes')
const productsRoutes = require('./routes/productsRoutes')
const productsApiRoutes = require('./routes/productsApiRoutes')
const entriesApiRoutes = require('./routes/entriesApiRoutes')

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
//Public folder
app.use(express.static('public'))

// Docummentando con swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    const calc = calculator.add(2, 2);
    //res.send(`Hello World! La suma es ${suma}`)
    res.render('content', { msj: "The Bridge", calc })
})

//Rutas 
app.use('/books',booksRoutes); // Books
app.use('/products',productsRoutes); // Rutas web products
app.use('/api/products',productsApiRoutes); // Rutas web API products
app.use('/api/entries',entriesApiRoutes); // Rutas API entries
app.use(error404); // Middleware Para ruta no encontrada (404)

const server = app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e: "oO",
            T: "U "
        }))
})

module.exports = server;