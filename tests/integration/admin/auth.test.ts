import axios, { AxiosRequestConfig } from 'axios'
import TestHelper from '../../../utils/test-helper'
import Fixtures from '../../fixtures'
// const User = require('../../../models/admin/auth')

import expressApp from '../../../app'
import supertest from 'supertest'
import DBMigrate from 'db-migrate'
import { config } from 'dotenv'

config()

describe.skip('Authentication', () => {
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	/** db */
	let api
	let server
	let dbmigrate
	/** TODO: refactor en un helper */

	beforeAll(async () => {
		// if (process.env.RESET_DATABASE) {
		// 	dbmigrate = await DBMigrate.getInstance(true, { env: 'test' })
		// 	await dbmigrate.reset()
		// 	await dbmigrate.up()
		// }
		// const { app, server: _server } = await expressApp
		// api = await supertest(app)
		// server = _server
	})

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	let user
	let authz

	beforeAll(async () => {
		await Fixtures.resetAll()
		await Fixtures.createAll()
		// user = await Fixtures.User.Admin.instance
	})

	afterAll(async () => {
		await Fixtures.resetAll()
	})

	describe('/test_token', () => {
		test('should 401 if Audience is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: process.env.AUTH0_CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: process.env.GRANT_TYPE
				}
			}
			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Secret is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: process.env.AUTH0_CLIENT_ID,
					audience: process.env.AUDIENCE,
					grant_type: process.env.GRANT_TYPE
				}
			}
			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Client ID is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' },
				data: {
					client_secret: process.env.CLIENT_SECRET,
					audience: process.env.AUDIENCE,
					grant_type: process.env.GRANT_TYPE
				}
			}
			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Grant Type is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: process.env.AUTH0_CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					audience: process.env.AUDIENCE
				}
			}
			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 200 and return Auth0 tokens', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: process.env.AUTH0_CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					audience: process.env.AUDIENCE,
					grant_type: process.env.GRANT_TYPE
				}
			}
			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(200)
			expect(response.type).toBe('application/json')
		})
	})

	afterAll(async () => {
		await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000)) // trick
		server.close()
	})
})
