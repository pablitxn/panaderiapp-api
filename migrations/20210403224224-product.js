var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var PromiseDB = require('./util/promise-db')

const tableName = 'product'
const columnSpec = {
	id: {
		type: 'int',
		unsigned: true,
		notNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	name: { type: 'string', notNull: true, unique: false },
	available: { type: 'boolean', notNull: true },
	is_deleted: { type: 'boolean', notNull: true, defaultValue: false },
	updated_at: { type: 'timestamp', notNull: false },
	created_at: { type: 'timestamp', notNull: false }
}

exports.up = PromiseDB.upCreateTable(tableName, columnSpec)
exports.down = PromiseDB.downDropTable(tableName, columnSpec)
