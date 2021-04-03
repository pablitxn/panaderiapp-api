// Dependency Injection
import { Container } from 'typedi'
// Logger
import LoggerInstance from './logger'
// Project Configs
// import config from 'config'

export default ({ models }: { models: { name: string; model: any }[] }) => {
	try {
		Container.set('logger', LoggerInstance)

		models.forEach((m) => {
			Container.set(m.name, m.model)
		})
		console.log('loggers')
	} catch (e) {
		LoggerInstance.error('Error on dependency injector loader: %o', e)
		throw e
	}
}
