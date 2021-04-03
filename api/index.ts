import { Router } from 'express'
import post from './routes/blog/post'
import auth from './routes/admin/auth'

export default () => {
	const app = Router()
	post(app)
	// pages with auth
	auth(app)
	return app
}
