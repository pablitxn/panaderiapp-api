import ModelDB from '../db-model'
import { IUser } from '../../interfaces/admin/user'
import { IDatabase, IMain } from 'pg-promise'

type Limit = number | null
type Offset = number | null

class UserDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	async create(user: IUser) {
		try {
			const [record] = await this.db.func('fn_insert_user', user)
			return record
		} catch (err) {
			return err
		}
	}

	async update(id: number, user: IUser) {
		try {
			const [record] = await this.db.func('fn_update_user', { id, ...user })
			return record
		} catch (err) {
			return err
		}
	}

	async delete(id: number) {
		try {
			const [record] = await this.db.func('fn_delete_user', id)
			return record
		} catch (err) {
			return err
		}
	}

	async index(limit: Limit, offset: Offset) {
		try {
			const [record] = await this.db.func('fn_find_user', [null, limit, offset])
			return record
		} catch (err) {
			return err
		}
	}

	async findById(id: number) {
		try {
			const [record] = await this.db.func('fn_find_user', id)
			return record
		} catch (err) {
			return err
		}
	}
}

export default UserDB
