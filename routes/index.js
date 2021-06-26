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

	// Games
	app.post('/api/productos/create', productosController.create);
	app.get('/api/productos/list', productosController.list);
	app.get('/api/productos/find/id/:id', productosController.find);

	// Ventas
	app.post('/api/ventas/create', ventasController.create);
	app.get('/api/ventas/list', ventasController.list);

};