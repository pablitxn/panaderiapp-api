import { db, pgp } from '../loaders/pg-promise'
import ProductDB, { IProductDB } from '../data/product'
import { IProduct, fieldSpec } from '../interfaces/product'
import { Limit, Offset } from '../interfaces'
import Model from '.'

/**
 * TODO : improve typing
 */
class Product extends Model {
	constructor(fields: IProduct) {
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
	static deshydrate(fields: IProduct): IProductDB {
		const fieldsDeshydrated: IProductDB = super.deshydrate(fields, fieldSpec)
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
	 * @returns An array with Products
	 */
	static async index(limit: Limit, offset: Offset) {
		try {
			const database = new ProductDB(db, pgp)
			const records = await database.index(limit, offset)
			const res = await records.map((record: any) => new Product(record).hydrate())
			return res
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Product ID
	 * @returns A certain Product
	 */
	static async findById(id: number) {
		try {
			const database = new ProductDB(db, pgp)
			const res = await database.findById(id)
			return res
		} catch (err) {
			return err
		}
	}
	/**
	 * @param product - Object seralized
	 * @returns Product created
	 */
	static async create(product: IProduct) {
		try {
			const database = new ProductDB(db, pgp)
			const productFormatted = Product.deshydrate(product)
			const record = await database.create(productFormatted)
			const res = new Product(record).hydrate()
			return res
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Product ID
	 * @param product - Object serialized with fields to edit
	 * @returns Product edited
	 */
	static async edit(id: number, product: IProduct) {
		try {
			const database = new ProductDB(db, pgp)
			const record = await database.update(id, product)
			const res = new Product(record).hydrate()
			return res
		} catch (err) {
			return err
		}
	}
	/**
	 *
	 * @param {number} id - Product ID
	 * @returns Name and ID of Product deleted
	 */
	static async delete(id: number) {
		try {
			const database = new ProductDB(db, pgp)
			const res = await database.delete(id)
			return res
		} catch (err) {
			return err
		}
	}
}

export default Product
