/**
 * @author Alejandro Reyes <alejandroreyes.com> 
 * @exports entries
 * @namespace SQLQueries 
 */

/* const { Pool } = require('pg');
const queries = require('./queries')
const pool = new Pool({
    host: 'localhost',
    user: 'alex',
    database: 'postgres',
    password: '1234'
}) */

const pool = require('../utils/db_pgsql'); // Conexión a la BBDD
const queries = require('./queries'); // Queries SQL

/**
  * Descripción de la función: Esta función busca todas las entries de cierto autor por email.
  * @memberof SQLQueries 
  * @method getEntriesByEmail 
  * @async
  * @param {String} email email del autor
  * @return {Object} Devuelve las entries encontradas en un array []
  * @throws {Error} Error de consulta a la BBDD
  */
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

/**
 * Descripción: Esta función devuelve todas las entries del sistema
 * @memberof SQLQueries 
 * @method getAllEntries 
 * @async 
 * @return {Object} Devuelve todas las entries en un array
 * @throws {Error} Error de consulta a la BBDD
 */
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

/**
 * Descripción: Esta función crea una entry nueva
 <pre>
 * Ejemplo:
 * {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}
 </pre>
 * 
 * 
 * @memberof SQLQueries 
 * @method createEntry 
 * @async 
 * @param {Object} entry nueva entry
 <pre>
{
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}
</pre>
 * @return {Object} Devuelve todas las entries en un array
 * @throws {Error} Error de consulta a la BBDD
 */
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE 
//UPDATE

const updateEntry = async (entry) => {
    const { title, new_title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry,[new_title, content, email, category,title]);
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry
    //deleteEntry
    
}

module.exports = entries;


// Pruebas
/*
    getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
*/

/*
getAllEntries()
.then(data=>console.log(data))
*/

/*
let newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}

createEntry(newEntry)
    .then(data => console.log(data))
    
*/

// UPDATE
/*
let dataUpdateEntry = {
    title: "Se suspende Primavera Sound",
    new_title:"Se suspende Primavera Sound por lluvia",
    content: "Se enfanga todo y Blur se fue a la Riviera. Pet Shop Boys lo petó",
    email: "javi@gmail.com",
    category: "conciertos"
}

updateEntry(dataUpdateEntry)
    .then(data => console.log(data))
    */
