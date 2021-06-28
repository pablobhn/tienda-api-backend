const Sequelize = require('sequelize');
const usuarios = require('../models').usuario;

module.exports = {

	/**
	 * Create a new user validate before if not exists
	 * 
	 * Example: INSERT INTO usuarios (username, status) VALUES ("lucas", "1");
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return usuarios
			.findOrCreate({
				where: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					favoritos: []
				},
				username: req.body.username
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM usuarios
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return usuarios
			.findAll({})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table users
	 * 
	 * Example: SELECT * FROM usuarios WHERE username = 'Lucas'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	find(req, res) {
		return usuarios
			.findOne({
				where: {
					username: req.params.username
				}
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	login(req, res) {
		return usuarios
			.findOne({
				where: {
					email: req.body.email,
					password: req.body.password
				}
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	addfav(req, res) {
		return usuarios
			.update(
				{ 'favoritos': Sequelize.fn('array_append', Sequelize.col('favoritos'), req.params.idproducto) },
				{ 'where':
					{ 'username': req.params.username }
				}
				)
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	}
}