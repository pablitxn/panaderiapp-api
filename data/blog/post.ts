import ModelDB from '../db-model'
import { IPost } from '../../interfaces/blog/post'
import { Limit, Offset } from '../../interfaces'
import { IDatabase, IMain } from 'pg-promise'

export interface IPostDB {
	id?: number
	title: string
	subTitle?: string
	author?: string
	src_background?: string
	alt_background?: string
	img_author?: string
	brief_header?: string
	article: string
	is_deleted?: boolean
	is_draft?: boolean
	updated_at?: Date
	created_at?: Date
}

class PostDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	async create(post: IPostDB): Promise<IPostDB> {
		try {
			const record = await this.db.func('fn_insert_post', post)
			return record[0]
		} catch (err) {
			return err
		}
	}

	async update(id: number, post: IPost) {
		try {
			const record = await this.db.func('fn_update_post', { id, ...post })
			return record
		} catch (err) {
			return err
		}
	}

	async delete(id: number) {
		try {
			const record = await this.db.func('fn_delete_post', id)
			return record
		} catch (err) {
			return err
		}
	}

	async index(limit: Limit, offset: Offset) {
		try {
			const record = await this.db.func('fn_find_post', [null, limit, offset])
			return record
		} catch (err) {
			return err
		}
	}

	async findById(id: number) {
		try {
			const record = await this.db.func('fn_find_post', id)
			return record
		} catch (err) {
			return err
		}
	}
}

export default PostDB
