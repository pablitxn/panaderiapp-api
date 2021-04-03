var dbm = global.dbm || require('db-migrate')
var PromiseDB = require('./util/promise-db')

const tableName = 'post'

exports.up = PromiseDB.run(tableName, null, (pdb) => {
	return pdb.addColumn('updated_at', {
		type: 'timestamp',
		unsigned: true,
		notNull: false
	})
})

exports.down = PromiseDB.run(tableName, null, (pdb) => {
	return pdb.removeColumn('updated_at')
})
