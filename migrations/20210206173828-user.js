var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var PromiseDB = require('./util/promise-db')

const tableName = 'user_'
const columnSpec = {
	id: {
		type: 'int',
		unsigned: true,
		notNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	given_name: { type: 'string' },
	family_name: { type: 'string' },
	name: { type: 'string' },
	nickname: { type: 'string', notNull: true },
	brief_description: { type: 'string' },
	email: { type: 'string', notNull: true, unique: true },
	firm: { type: 'string' },
	picture: { type: 'string' },
	is_deleted: { type: 'boolean', notNull: true, defaultValue: false },
	updated_at: { type: 'timestamp' },
	created_at: { type: 'timestamp', notNull: true }
}

exports.up = PromiseDB.upCreateTable(tableName, columnSpec)
exports.down = PromiseDB.downDropTable(tableName, columnSpec)
