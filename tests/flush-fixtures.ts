import Fixtures from './fixtures'

let env = process.argv[2]
if (env === 'dev') env = 'development'
require(`../config/env/${env}`)

console.log(`Flushing fixtures: ${env}`)
Fixtures.resetAll()
	.then(() => {
		console.log('Done flushing fixtures.')
		process.exit()
	})
	.catch((err) => {
		console.log(err.message)
		process.exit(1)
	})
