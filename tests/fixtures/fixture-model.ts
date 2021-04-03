// @ts-nocheck
import { create as _create } from 'sql-fixtures'
import configs from '../../loaders/configs'
import { IDatabase, IMain } from 'pg-promise'
import pgPromise from 'pg-promise'

type ExtendedProtocol = IDatabase<any> & any
const pgp: IMain = pgPromise()
const db: ExtendedProtocol = pgp(configs.db)

class Fixture {
	constructor(table, spec) {
		this.table = table
		this.spec = spec
		this.instance = null
	}

	create() {
		return new Promise((res, rej) => {
			let fixtureSpec = {}
			fixtureSpec[this.table] = this.spec

			const dbConfig = {
				client: configs.db.driver,
				connection: {
					user: configs.db.user,
					password: configs.db.password,
					database: configs.db.database,
					port: configs.db.port
				}
			}

			_create(dbConfig, fixtureSpec, (err, result) => {
				if (err) {
					console.log(`Error loading fixtures for table '${this.table}': ${err.message}`)
					rej(err)
				} else {
					let record = result[this.table]
					if (record.constructor.name === 'Array' && record.length === 1)
						record = record[0]
					this.instance = record
					res(this.instance)
				}
			})
		})
	}

	static register(table, specs) {
		let result = {}
		let fixtures = []

		Object.keys(specs).forEach((key) => {
			let fixture = new Fixture(table, specs[key])
			result[key] = fixture
			fixtures.push(fixture)
		})

		result['reset'] = Fixture.resetter(table)
		result['createAll'] = Fixture.createAller(fixtures)

		return result
	}

	static resetter(table) {
		return () =>
			new Promise((res, rej) => {
				const _res = db.none(`DELETE FROM ${table};`)
				res(_res)
				if (rej) throw rej
				else res(result)
			})
	}

	static createAller(fixtures) {
		return () => {
			const creators = fixtures.map((f) => f.create())
			return Promise.all(creators)
		}
	}
}

export default Fixture
