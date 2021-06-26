const Sequelize = require('sequelize');
const productos = require('../models').producto;

module.exports = {
	/**
	 * Create a new producto
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return productos
			.findOrCreate({
				where: {
					title: req.body.title,
				},
				defaults: {
					title: req.body.title,
					description: req.body.description,
					price: req.body.price,
					imgSrc: req.body.imgSrc,
					avatarUrl: req.body.avatarUrl,
					type: req.body.type,
					qty: req.body.qty
				}
			})
			.then(productos => res.status(200).send(productos))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find all games
	 * 
	 * Example: SELECT * FROM usuarios
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return productos
			.findAll({})
			.then(productos => res.status(200).send(productos))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table games
	 * 
	 * Example: SELECT * FROM productos WHERE name = 'Pac Man'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	find(req, res) {
		return productos
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(productos => res.status(200).send(productos))
			.catch(error => res.status(400).send(error))
	}
}