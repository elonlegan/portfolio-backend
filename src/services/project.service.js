const db = require('../database');

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};

async function getAll() {
	const projects = await db.Project.find();
	return projects;
}
async function getById(id) {
	const project = await getProject(id);
	return project;
}

async function create(params) {
	// validate
	if (await db.Project.findOne({ title: params.title })) {
		throw (
			'Project "' + params.title + '" is already created'
		);
	}

	const project = new db.Project(params);

	// save project
	await project.save();

	return project;
}

async function update(id, params) {
	// validate
	const projectExist = await db.Project.findOne({
		title: params.title,
	});
	if (projectExist && projectExist.id !== id) {
		throw (
			'Project "' + params.title + '" is already created'
		);
	}
	const project = await getProject(id);

	// copy params to project and save
	Object.assign(project, params);

	await project.save();

	return project;
}

async function _delete(id) {
	const project = await getProject(id);
	await project.remove();
}

// helper functions

async function getProject(id) {
	if (!db.isValidId(id)) throw 'Project not found';
	const project = await db.Project.findById(id);
	if (!project) throw 'Project not found';
	return project;
}
