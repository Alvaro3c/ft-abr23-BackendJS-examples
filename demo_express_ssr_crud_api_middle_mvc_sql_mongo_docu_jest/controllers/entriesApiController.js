/**
 * @author AlejandroReyes <alejandroreyespage.com> 
 * @exports routes 
 * @namespace routes 
 */

const entry = require('../models/entries'); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo

/**
  * <pre>
  * GET http://localhost:3000/entries --> All
  * GET http://localhost:3000/entries?email=hola@gmail.com --> por email
  * </pre>
  * @memberof routes 
  * @method getEntries 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con todas las entries encontradas
  * @throws {error} 
  */
const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}


/**
  * <pre>
  * Crear entry por email
  * POST http://localhost:3000/api/entries
  * let newEntry = {
        "title":"noticia desde Node",
        "content":"va a triunfar esto2",
        "email":"alejandru@thebridgeschool.es",
        "category":"sucesos"}
  * </pre>
  * @memberof routes 
  * @method createEntry 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {Number} Número de entries creadas
  * @throws {error} 
  */
const createEntry = async (req, res) => {
    const dataEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(dataEntry);
    res.status(201).json({
        "items_created": response,
        data: dataEntry
    });
}

/**
  * <pre>
  * Actualizar entry por email
  * PUT http://localhost:3000/api/entries
  * let newEntry = {
        "title":"noticia desde Node",
        "new_title":"nuevo nombre"
        "content":"va a triunfar esto2",
        "email":"alejandru@thebridgeschool.es",
        "category":"sucesos"}
  * </pre>
  * @memberof routes 
  * @method updateEntry 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {Number} Número de entries actualizadas
  * @throws {error} 
  */
const updateEntry = async (req, res) => {
    const dataEntry = req.body; // {title,new_title,content,email,category}
    const response = await entry.updateEntry(dataEntry);
    res.status(200).json({
        "items_updated": response,
        data: dataEntry
    });
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry
    //deleteEntry, --> DELETE
    
}