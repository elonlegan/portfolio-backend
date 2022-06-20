import Project from '../models/Project';

export const renderProjects = async (req, res) => {
	const projects = await Project.find().lean();

	console.log(projects);

	res.render('index', { projects: projects });
};
export const createProjects = async (req, res) => {
	try {
		if (!req.body.image) {
			req.body.image = undefined;
		}

		const project = Project(req.body);

		const projectSaved = await project.save();

		console.log(projectSaved);

		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
};

export const renderProjectsEdit = async (req, res) => {
	try {
		const project = await Project.findById(
			req.params.id
		).lean();
		res.render('edit', { project });
	} catch (error) {
		console.error(error);
	}
};

export const projectsEdit = async (req, res) => {
	const { id } = req.params;
	await Project.findByIdAndUpdate(id, req.body);
	res.redirect('/');
};

export const deleteProject = async (req, res) => {
	const { id } = req.params;
	await Project.findByIdAndDelete(id);
	res.redirect('/');
};

export const projectToggleDone = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findById(id);
	project.done = !project.done;
	await project.save();
	console.log(project);
	res.redirect('/');
};
