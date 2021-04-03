// Express
import { Application } from 'express'
// Middlewares
import bodyParser from 'body-parser'
import cors from 'cors'
// Rotes
import routes from '../api'
// Configs
import config from './configs'

const Express = (app: Application) => {
	/**  Server Status  **/
	app.get('/status', (req, res) => {
		res.status(200).end()
	})
	app.head('/status', (req, res) => {
		res.status(200).end()
	})
	/**  Middlewares  **/
	app.enable('trust proxy')
	app.use(cors())
	app.use(require('method-override')())
	app.use(bodyParser.json())
	/**  Load API routes  **/
	app.use(config.api.prefix, routes())

	/** Error handlers  **/
	app.use((req, res, next) => {
		const err = new Error('Not Found')
		err['status'] = 404
		next(err)
	})

	app.use((err, req, res, next) => {
		if (err.name === 'UnauthorizedError') {
			return res.status(err.status).send({ message: err.message }).end()
		}
		return next(err)
	})
	app.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.json({
			errors: {
				message: err.message
			}
		})
	})
}

export default Express
