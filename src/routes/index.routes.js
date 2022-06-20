import { Router } from 'express';

import {
	renderProjects,
	createProjects,
	renderProjectsEdit,
	projectsEdit,
	deleteProject,
	projectToggleDone,
} from '../controllers/project.controller';
import {
	getAllProjects,
	getProject,
	createProject,
	EditProject,
	deleteProjectApi,
} from '../controllers/apiProject.controller';

const router = Router();

// Visual App ------------------------------------
router.get('/', renderProjects);
router.post('/project/add', createProjects);
router.get('/project/:id/toggleDone', projectToggleDone);
router.get('/project/:id/edit', renderProjectsEdit);
router.post('/project/:id/edit', projectsEdit);
router.get('/project/:id/delete', deleteProject);
// Visual App ------------------------------------

// Api App ------------------------------------
router.get('/api/projects', getAllProjects);
router.get('/api/projects/:id', getProject);
router.post('/api/projects', createProject);
router.put('/api/projects/:id', EditProject);
router.delete('/api/projects/:id', deleteProjectApi);
// Api App ------------------------------------

export default router;
