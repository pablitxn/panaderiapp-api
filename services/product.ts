import ProductModel from '../models/product'

type Limit = number | null
type Offset = number | null
/**
 * TODO: improve typing
 */
class ProductService {
	static async index(limit: Limit, offset: Offset) {
		try {
			const response = await ProductModel.index(limit, offset)
			return response
		} catch (err) {
			return err
		}
	}

	static async create(payload: any) {
		try {
			const response = await ProductModel.create(payload)
			return response
		} catch (err) {
			return err
		}
	}

	static async findById(id: number) {
		try {
			const response = await ProductModel.findById(id)
			return response
		} catch (err) {
			return err
		}
	}

	static async edit(id: number, post: any) {
		try {
			const response = await ProductModel.edit(id, post)
			return response
		} catch (err) {
			return err
		}
	}

	static async delete(id: number) {
		try {
			const response = await ProductModel.delete(id)
			return response
		} catch (err) {
			return err
		}
	}
}

export default ProductService
