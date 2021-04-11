import { Router } from 'express'
import product from './routes/product'

export default () => {
	const app = Router()
	product(app)
	return app
}
