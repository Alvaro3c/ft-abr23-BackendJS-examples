/**
  * Función para tratar rutas no encontradas
  * @memberof middlewares 
  * @method manage404 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @param {Object} next función que pasa a siguiente estado si la comprobación es correcta 
  */

const manage404 = function (req,res,next){
	res.status(404).json({msj:'Error! 404. Ruta no encontrada :)'});
};

module.exports = manage404;