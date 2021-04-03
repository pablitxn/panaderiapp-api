import Fixtures from './fixtures'

let env = process.argv[2]
if (env === 'dev') env = 'development'
require(`../config/env/${env}`)

console.log(`Inserting fixtures: ${env}`)
Fixtures.createAll()
	.then(() => {
		console.log('Done inserting fixtures.')
		process.exit()
	})
	.catch((err) => {
		console.log(err.message)
		process.exit(1)
	})
