import ModelDB from './db-model'
import { IProduct } from '../interfaces/product'
import { Limit, Offset } from '../interfaces'
import { IDatabase, IMain } from 'pg-promise'

export interface IProductDB {
	id?: number
	name: string
	available: boolean
	is_deleted?: boolean
	updated_at?: Date
	created_at?: Date
}

class ProductDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	async create(product: IProductDB): Promise<IProductDB> {
		try {
			const record = await this.db.func('fn_insert_product', product)
			return record[0]
		} catch (err) {
			return err
		}
	}

	async update(id: number, product: IProduct) {
		try {
			const record = await this.db.func('fn_update_product', { id, ...product })
			return record[0]
		} catch (err) {
			return err
		}
	}

	async delete(id: number) {
		try {
			const record = await this.db.func('fn_delete_product', id)
			return record[0]
		} catch (err) {
			return err
		}
	}

	async index(limit: Limit, offset: Offset) {
		try {
			const record = await this.db.func('fn_find_product', [null, limit, offset])
			return record
		} catch (err) {
			return err
		}
	}

	async findById(id: number) {
		try {
			const record = await this.db.func('fn_find_product', id)
			return record[0]
		} catch (err) {
			return err
		}
	}
}

export default ProductDB
