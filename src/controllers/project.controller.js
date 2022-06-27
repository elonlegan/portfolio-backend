const projectService = require('../services/project.service');
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
	projectService
		.getAll()
		.then((projects) => res.json(projects))
		.catch(next);
}

function getById(req, res, next) {
	projectService
		.getById(req.params.id)
		.then((project) =>
			project ? res.json(project) : res.sendStatus(404)
		)
		.catch(next);
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		date: Joi.string().required(),
		url: Joi.string().required(),
		repositoryUrl: Joi.string().required(),
		imageUrl: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function create(req, res, next) {
	projectService
		.create(req.body)
		.then((project) => res.json(project))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schema = Joi.object({
		title: Joi.string().empty(''),
		description: Joi.string().empty(''),
		date: Joi.string().empty(''),
		url: Joi.string().empty(''),
		repositoryUrl: Joi.string().empty(''),
		imageUrl: Joi.string().empty(''),
	});
	validateRequest(req, next, schema);
}

function update(req, res, next) {
	projectService
		.update(req.params.id, req.body)
		.then((project) => res.json(project))
		.catch(next);
}

function _delete(req, res, next) {
	projectService
		.delete(req.params.id)
		.then(() =>
			res.json({ message: 'Project deleted successfully' })
		)
		.catch(next);
}
