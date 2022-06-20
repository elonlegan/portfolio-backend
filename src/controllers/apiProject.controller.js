import Project from '../models/Project';

export const getAllProjects = async (req, res) => {
	const projects = await Project.find().lean();

	console.log(projects);

	res.status(200).send(projects);
};

export const getProject = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findById(id).lean();

	console.log(project);

	res.status(200).send(project);
};

export const createProject = async (req, res) => {
	try {
		const project = Project(req.body);

		const projectSaved = await project.save();

		console.log(projectSaved);
		res.status(200).send(projectSaved);
	} catch (error) {
		console.log(error);
	}
};

export const EditProject = async (req, res) => {
	const { id } = req.params;
	const projectUpdated = await Project.findByIdAndUpdate(
		id,
		req.body
	);
	res.status(200).send(projectUpdated);
};

export const deleteProjectApi = async (req, res) => {
	const { id } = req.params;
	await Project.findByIdAndDelete(id);
	res.status(200).send();
};
