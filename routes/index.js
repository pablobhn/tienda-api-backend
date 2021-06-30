// Controllers
const usuariosController = require('../controllers/usuarios');
const productosController = require('../controllers/productos');
const ventasController = require('../controllers/ventas');

module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: 'test response',
	}));

	// Routes of Web Services
	// Users
	app.post('/api/usuarios/create', usuariosController.create);
	app.get('/api/usuarios/list', usuariosController.list);
	app.get('/api/usuarios/find/username/:username', usuariosController.find);
	app.post('/api/usuarios/login', usuariosController.login);
	app.post('/api/usuarios/addfav/username/:username/idproducto/:idproducto', usuariosController.addfav);
	app.post('/api/usuarios/rmfav/username/:username/idproducto/:idproducto', usuariosController.rmfav);

	// Games
	app.post('/api/productos/create', productosController.create);
	app.get('/api/productos/list', productosController.list);
	app.get('/api/productos/find/id/:id', productosController.find);
	app.post('/api/productos/delete/id/:id', productosController.delete);

	// Ventas
	app.post('/api/ventas/create', ventasController.create);
	app.get('/api/ventas/list', ventasController.list);

};