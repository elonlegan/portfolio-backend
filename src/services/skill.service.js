const db = require('../database');

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};

async function getAll() {
	const skills = await db.Skill.find();
	return skills;
}
async function getById(id) {
	const skill = await getSkill(id);
	return skill;
}

async function create(params) {
	// validate
	if (await db.Skill.findOne({ title: params.title })) {
		throw 'Skill "' + params.title + '" is already created';
	}

	const skill = new db.Skill(params);

	// save skill
	await skill.save();

	return skill;
}

async function update(id, params) {
	// validate
	const skillExist = await db.Skill.findOne({
		title: params.title,
	});
	if (skillExist && skillExist.id !== id) {
		throw 'Skill "' + params.title + '" is already created';
	}
	const skill = await getSkill(id);

	// copy params to skill and save
	Object.assign(skill, params);

	await skill.save();

	return skill;
}

async function _delete(id) {
	const skill = await getSkill(id);
	await skill.remove();
}

// helper functions

async function getSkill(id) {
	if (!db.isValidId(id)) throw 'Skill not found';
	const skill = await db.Skill.findById(id);
	if (!skill) throw 'Skill not found';
	return skill;
}
