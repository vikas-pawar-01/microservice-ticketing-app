import request from 'supertest';
import { app } from '../../app';

it('fails when email that does not exists is supplied', async () => {
	return request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.lcl',
			password: 'test',
		})
		.expect(400);
});

it('fails when incorrect password is supplied', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.lcl',
			password: 'test',
		})
		.expect(201);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.lcl',
			password: 'test123',
		})
		.expect(400);
});

it('responds with cookie when ggiven valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.lcl',
			password: 'test',
		})
		.expect(201);

	const response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.lcl',
			password: 'test',
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
