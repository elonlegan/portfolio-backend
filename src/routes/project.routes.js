const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Role = require('../helpers/role');

// Controllers
const projectController = require('../controllers/project.controller');

// routes
router.get('/', projectController.getAll);

router.get(
	'/:id',
	authorize(Role.Admin),
	projectController.getById
);

router.post(
	'/',
	authorize(Role.Admin),
	projectController.createSchema,
	projectController.create
);

router.put(
	'/:id',
	authorize(Role.Admin),
	projectController.updateSchema,
	projectController.update
);

router.delete(
	'/:id',
	authorize(Role.Admin),
	projectController.delete
);

module.exports = router;
