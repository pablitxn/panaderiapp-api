import { db, pgp } from '../../loaders/pg-promise'
import PostDB, { IPostDB } from '../../data/blog/post'
import { IPost, fieldSpec } from '../../interfaces/blog/post'
import { Limit, Offset } from '../../interfaces'
import Model from '../model'

class Post extends Model {
	constructor(fields: IPost) {
		super(fieldSpec, fields)
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns
	 */
	inflate(fields: any) {
		super.inflate(fields)
		// if (fields.something) {	}
		return this
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns fields in db format
	 */
	static deshydrate(fields: IPost): IPostDB {
		const fieldsDeshydrated: IPostDB = super.deshydrate(fields, fieldSpec)
		return fieldsDeshydrated
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns
	 */
	hydrate() {
		const fields = super.hydrate()
		return fields
	}

	/** TODO: describe what is it
	 * 	when will i need modificate render?
	 *  when i will need to do it?
	 * @param options
	 * @returns fields ? what
	 */
	render(options = {}) {
		let fields = super.render(options)
		return fields
	}

	/** TODO: describe what is it
	 * 	when will i need modificate render?
	 *  what can this receive?
	 * @returns void
	 */
	validate(el: any): any {
		// let errors = super.validate(true)
		// if(someValidation) errors.push({ field, message })
		// if (errors.length > 0) throw CustomError.validationError(errors)
	}

	/**
	 * @param {number} limit -Limit quantity results
	 * @param {number} offset - Offset pagination
	 * @returns An array with Posts
	 */
	static async index(limit: Limit, offset: Offset) {
		try {
			const database = new PostDB(db, pgp)
			const records = await database.index(limit, offset)
			const posts = await records.map((record) => new Post(record).hydrate())
			return posts
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Post ID
	 * @returns A certain Post
	 */
	static async findById(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const data = await database.findById(id)
			return data
		} catch (err) {
			return err
		}
	}
	/**
	 * @param post - Object seralized
	 * @returns Post created
	 */
	static async create(post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const postFormatted = Post.deshydrate(post)
			const record = await database.create(postFormatted)
			const response = new Post(record).hydrate()
			return response
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Post ID
	 * @param post - Object serialized with fields to edit
	 * @returns Post created
	 */
	static async edit(id: number, post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.update(id, post)
			return record
		} catch (err) {
			return err
		}
	}
	/**
	 *
	 * @param {number} id - Post ID
	 * @returns Name and ID of Post deleted
	 */
	static async delete(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.delete(id)
			return record
		} catch (err) {
			return err
		}
	}
}

export default Post
