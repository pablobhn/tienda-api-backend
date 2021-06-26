const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ventas = require('../models').ventas;
const productos = require('../models').producto;
const usuarios = require('../models').usuario;

module.exports = {
	/**
	 * Create a new ventas
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		// Looking for the user
		// SELECT * FROM usuarios WHERE id = 1 OR username = 'Lucas
		const responseUsuario = usuarios.findOne({
			where: {
				[Op.or]: [{
					username: req.body.usuario
				}, {
					id: req.body.usuario
				}]
			}
		});

		// Looking for the game
		// const responseProductos = productos.findAll({
		// 	attributes: ['id'],
		// 	where: { id: { [Op.in]: req.body.productos }}
		// });

		Promise
			.all([responseUsuario])
			.then(responses => {
				return ventas
					.create({
						cliente_id: responses[0].id,
						productos_id: req.body.productos_id,
						cantidades: req.body.cantidades
					})
					.then(ventas => res.status(200).send(ventas))
					.catch(error => res.status(400).send(error))
			})
	},

	/**
	 * List of ventass
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return ventas
			.findAll({
				// include: [{
				// 	model: usuarios,
				// 	as: 'usuario',
				// 	attributes: [
				// 		'id',
				// 		'username',
				// 		'email'
				// 	]
				// }, {
				// 	model: productos,
				// 	as: 'productos',
				// 	attributes: [
				// 		'id',
				// 		'title',
				// 		'description'
				// 	]
				// }],
				// attributes: [
				// 	'id'
				// ]
			})
			.then(ventas => res.status(200).send(ventas))
			.catch(error => res.status(400).send(error))
	}

}