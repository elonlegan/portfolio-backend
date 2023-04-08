const skillService = require('../services/skill.service');
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');

module.exports = {
	getAll,
	getById,
	createSchema,
	create,
	updateSchema,
	update,
	delete: _delete,
};

function getAll(req, res, next) {
	skillService
		.getAll()
		.then((skills) => res.json(skills))
		.catch(next);
}

function getById(req, res, next) {
	skillService
		.getById(req.params.id)
		.then((skill) =>
			skill ? res.json(skill) : res.sendStatus(404)
		)
		.catch(next);
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		title: Joi.string().required(),
		url: Joi.string().empty('').optional(),
		imageUrl: Joi.string().empty('').optional(),
		customStyles: Joi.string().empty('').optional(),
	});
	validateRequest(req, next, schema);
}

function create(req, res, next) {
	skillService
		.create(req.body)
		.then((skill) => res.json(skill))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schema = Joi.object({
		title: Joi.string().empty(''),
		url: Joi.string().empty(''),
		imageUrl: Joi.string().empty(''),
		customStyles: Joi.string().empty(''),
	});
	validateRequest(req, next, schema);
}

function update(req, res, next) {
	skillService
		.update(req.params.id, req.body)
		.then((skill) => res.json(skill))
		.catch(next);
}

function _delete(req, res, next) {
	skillService
		.delete(req.params.id)
		.then(() =>
			res.json({ message: 'skill deleted successfully' })
		)
		.catch(next);
}
