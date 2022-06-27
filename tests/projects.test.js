const {
	api,
	server,
	login,
	getAllTitleFromProjects,
} = require('./helpers');
const mongoose = require('mongoose');
const res = require('express/lib/response');

let projectExample = {
	title: 'project title',
	startWeek: '2022-W10',
	finishWeek: '2022-W11',
	imageUrl:
		'https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png',
};

let projectToEdit = {};

let token = '';

beforeAll(async () => {
	token = await login();

	const editResponse = await api
		.post('/projects')
		.set('Authorization', `Bearer ${token}`)
		.send({
			title: 'project title to edit',
			startWeek: '2022-W10',
			finishWeek: '2022-W11',
			imageUrl:
				'https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png',
		});

	projectToEdit = editResponse.body;
});

describe('GET all projects', () => {
	test('projects are returned as json', async () => {
		await api
			.get('/projects')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('is not possible without token', async () => {
		await api.get('/projects').expect(401);
	});
});

describe('CREATE a project', () => {
	test('is possible with a valid project', async () => {
		const response = await api
			.post('/projects')
			.set('Authorization', `Bearer ${token}`)
			.send(projectExample)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		const { titles } = await getAllTitleFromProjects(token);
		expect(titles).toContain(projectExample.title);

		projectExample = response.body;
	});

	test('is not possible without token', async () => {
		await api
			.post('/projects')
			.send(projectExample)
			.expect(401);
	});

	test('is not possible with an invalid project', async () => {
		const invalidProject = {
			title: 'project title invalid',
		};
		await api
			.post('/projects')
			.set('Authorization', `Bearer ${token}`)
			.send(invalidProject)
			.expect(400);
		const { titles } = await getAllTitleFromProjects(token);
		expect(titles).not.toContain(invalidProject.title);
	});
});

describe('EDIT project', () => {
	test('a project can be edited', async () => {
		projectToEdit.title = 'project title edited';
		projectToEdit.startWeek = '2022-W20';
		projectToEdit.finishWeek = '2022-W27';

		const response = await api
			.put(`/projects/${projectToEdit.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(projectToEdit)
			.expect(200);
	});

	test('a project that has an invalid id can not be edited', async () => {
		await api
			.put('/projects/1234')
			.set('Authorization', `Bearer ${token}`)
			.send(projectExample)
			.expect(400);
	});

	test('a project that has a valid id but do not exist can not be edited', async () => {
		const validObjectIdThatDoNotExist =
			'60451827152dc22ad768f442';
		await api
			.put(`/projects/${validObjectIdThatDoNotExist}`)
			.set('Authorization', `Bearer ${token}`)
			.send(projectExample)
			.expect(400);
	});
});

describe('DELETE project', () => {
	test('a project can be deleted', async () => {
		const { response: firstResponse } =
			await getAllTitleFromProjects(token);
		const { body: projects } = firstResponse;
		const projectToDelete = projects[0];

		await api
			.delete(`/projects/${projectToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		const { titles } = await getAllTitleFromProjects(token);

		expect(titles).not.toContain(projectToDelete.content);
	});

	test('a project that has an invalid id can not be deleted', async () => {
		await api
			.delete('/projects/1234')
			.set('Authorization', `Bearer ${token}`)
			.expect(404);
	});

	test('a project that has a valid id but do not exist can not be deleted', async () => {
		const validObjectIdThatDoNotExist =
			'60451827152dc22ad768f442';
		await api
			.delete(`/projects/${validObjectIdThatDoNotExist}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(404);
	});
});

afterAll(async () => {
	await api
		.delete(`/projects/${projectToEdit.id}`)
		.set('Authorization', `Bearer ${token}`);
	await api
		.delete(`/projects/${projectExample.id}`)
		.set('Authorization', `Bearer ${token}`);
	mongoose.connection.close();
	server.close();
});
