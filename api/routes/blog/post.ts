import { Router, Request, Response } from 'express'
import PostService from '../../../services/blog/post'
import { requestHelper } from '../../../utils'
import { auth, requiresAuth } from 'express-openid-connect'
import { checkPermissions } from '../../middlewares/permissions'
import configs from '../../../loaders/configs'
import { checkJwt } from '../../middlewares/authz'
import jwt from 'jsonwebtoken'

// Definitions
const route = Router()

const PostRoute = (app: Router) => {
	app.use('/blog', route)

	route.get('/posts', async (req: Request, res: Response) => {
		const { limit, offset } = requestHelper(req)
		try {
			const data = await PostService.index(limit, offset)
			res.status(200).json({ data })
		} catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	route.get('/posts/:id', async (req: Request, res: Response) => {
		try {
			const { id } = requestHelper(req)
			const data = await PostService.findById(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	app.use(auth(configs.authz))
	app.use(requiresAuth())
	// app.use(checkJwt)
	// app.use(checkPermissions)

	route.post('/posts', async (req: Request, res: Response) => {
		// const token = req.get('Authorization')
		// console.log('token', token)
		const authHeader = req.headers['authorization']
		const bearerToken = authHeader.split(' ')
		const token = bearerToken[1]
		console.log('token', token)
		jwt.verify(token, configs.authz.secret, (err, payload) => {
			if (err) {
				const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
				return console.log(message)
			}
			console.log('payload', payload)
		})
		try {
			const { body } = requestHelper(req)
			const data = await PostService.create(body)
			res.status(201).json({ data })
		} catch (err) {
			res.status(400).json({ error: err })
			throw err
		}
	})

	route.put('/posts/:id', async (req: Request, res: Response) => {
		try {
			const { id, body } = requestHelper(req)
			const data = await PostService.edit(id, body)
			res.status(201).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/posts/:id', async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id)
			const data = await PostService.delete(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})
}

export default PostRoute
