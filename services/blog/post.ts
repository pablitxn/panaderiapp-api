import PostModel from '../../models/blog/post'

type Limit = number | null
type Offset = number | null

class PostService {
	static async index(limit: Limit, offset: Offset) {
		try {
			const response = await PostModel.index(limit, offset)
			return response
		} catch (err) {
			return err
		}
	}

	static async create(payload: any) {
		try {
			const response = await PostModel.create(payload)
			return response
		} catch (err) {
			return err
		}
	}

	static async findById(id: number) {
		try {
			const response = await PostModel.findById(id)
			return response
		} catch (err) {
			return err
		}
	}

	static async edit(id: number, post: any) {
		try {
			const response = await PostModel.edit(id, post)
			return response
		} catch (err) {
			return err
		}
	}

	static async delete(id: number) {
		try {
			const response = await PostModel.delete(id)
			return response
		} catch (err) {
			return err
		}
	}
}

export default PostService
