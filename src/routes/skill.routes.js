const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Role = require('../helpers/role');

// Controllers
const skillController = require('../controllers/skill.controller');

// routes
router.get('/', skillController.getAll);

router.get(
	'/:id',
	authorize(Role.Admin),
	skillController.getById
);

router.post(
	'/',
	authorize(Role.Admin),
	skillController.createSchema,
	skillController.create
);

router.put(
	'/:id',
	authorize(Role.Admin),
	skillController.updateSchema,
	skillController.update
);

router.delete(
	'/:id',
	authorize(Role.Admin),
	skillController.delete
);

module.exports = router;
