import dependencyInjectorLoader from './dependencyInjector'
import expressLoader from './express'
// import ModelDB from './pg-promise'
import Logger from './logger'
export * from './pg-promise'

const Loaders = async ({ app }) => {
	/**  Dependency Injections  **/
	// await dependencyInjectorLoader({
	// 	models: [{ name: 'db', model: [{ ModelDB }] }]
	// })
	// Logger.info('db connected')

	/**  Express App **/
	await expressLoader(app)
	Logger.info('✌️ Express loaded')
}

export default Loaders
