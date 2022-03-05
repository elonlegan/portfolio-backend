import { Router } from 'express';

import {
	renderTasks,
	createTasks,
	renderTasksEdit,
	tasksEdit,
	deleteTask,
	taskToggleDone,
} from '../controllers/task.controller';

const router = Router();

router.get('/', renderTasks);

router.post('/task/add', createTasks);

router.get('/task/:id/toggleDone', taskToggleDone);

router.get('/task/:id/edit', renderTasksEdit);

router.post('/task/:id/edit', tasksEdit);

router.get('/task/:id/delete', deleteTask);

export default router;
