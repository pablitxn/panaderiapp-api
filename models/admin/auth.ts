import { db, pgp } from '../../loaders/pg-promise'
import UserDB from '../../data/admin/user'
import Model from '../model'

type Limit = number | null
type Offset = number | null

class Auth {
	constructor() {}

	static async create(post: any) {
		try {
			const database = new UserDB(db, pgp)
			const record = await database.create(post)
			return record
		} catch (err) {
			return err
		}
	}

	// static async update(post: any) {
	// 	try {
	// 		const database = new UserDB(db, pgp)
	// 		const record = await database.update(post)
	// 		return record
	// 	} catch (err) {
	// 		return err
	// 	}
	// }

	// static async validate(payload: any) {
	// 	try {
	// 		const database = new UserDB(db, pgp)
	// 		const record = await database.find(payload)
	// 		return record
	// 	} catch (err) {
	// 		return err
	// 	}
	// }

	static hydrate(payload: any) {
		try {
			return payload
		} catch (err) {
			return err
		}
	}

	static deshydrate(payload: any) {
		try {
			return payload
		} catch (err) {
			return err
		}
	}
}

export default Auth
