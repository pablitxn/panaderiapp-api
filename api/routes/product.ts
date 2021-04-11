import { Router, Request, Response } from 'express'
import ProductService from '../../services/product'
import { requestHelper } from '../../utils'

// Definitions
const route = Router()

const ProductRoute = (app: Router) => {
	app.use('/products', route)

	route.get('/', async (req: Request, res: Response) => {
		const { limit, offset } = requestHelper(req)
		try {
			const data = await ProductService.index(limit, offset)
			res.status(200).json({ data })
		} catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	route.get('/:id', async (req: Request, res: Response) => {
		try {
			const { id } = requestHelper(req)
			const data = await ProductService.findById(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.post('/', async (req: Request, res: Response) => {
		try {
			const { body } = requestHelper(req)
			const data = await ProductService.create(body)
			res.status(201).json({ data })
		} catch (err) {
			res.status(400).json({ error: err })
			throw err
		}
	})

	route.put('/:id', async (req: Request, res: Response) => {
		try {
			const { id, body } = requestHelper(req)
			const data = await ProductService.edit(id, body)
			res.status(201).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/:id', async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id)
			const data = await ProductService.delete(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})
}

export default ProductRoute
