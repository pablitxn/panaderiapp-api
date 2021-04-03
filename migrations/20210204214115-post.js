var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var PromiseDB = require('./util/promise-db')

const tableName = 'post'
const columnSpec = {
	id: {
		type: 'int',
		unsigned: true,
		notNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	title: { type: 'string', notNull: true, unique: false },
	sub_title: { type: 'string', notNull: true, unique: false },
	author: { type: 'string', notNull: true, unique: false },
	src_background: { type: 'string', notNull: true, unique: false },
	alt_background: { type: 'string', notNull: true, unique: false },
	img_author: { type: 'string', notNull: false, unique: false },
	brief_header: { type: 'string', notNull: false, unique: false },
	article: { type: 'string', notNull: true, unique: false },
	is_deleted: { type: 'boolean', notNull: true, unique: false, defaultValue: false },
	is_draft: { type: 'boolean', notNull: true, unique: false, defaultValue: true },
	created_at: { type: 'timestamp', notNull: false }
}

exports.up = PromiseDB.upCreateTable(tableName, columnSpec)
exports.down = PromiseDB.downDropTable(tableName, columnSpec)
