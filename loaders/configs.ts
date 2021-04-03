import dotenv from 'dotenv'
import fs from 'fs'

const TEST = 'test'
const DEV = 'development'
const PROD = 'production'
const ENV = process.env.NODE_ENV

let envFound

switch (ENV) {
	case TEST:
		envFound = dotenv.parse(fs.readFileSync('.env.test'))
		break
	case DEV:
		envFound = dotenv.parse(fs.readFileSync('.env.dev'))
		break
	case PROD:
		envFound = dotenv.parse(fs.readFileSync('.env'))
		break

	default:
		envFound = dotenv.config()
}

if (envFound.error) {
	// This error should crash whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
	// Configs
	port: parseInt(envFound.PORT),
	baseURL: envFound.BASE_URL,
	env: envFound.NODE_ENV,
	// Auth0
	authz: {
		issuerBaseURL: envFound.AUTH0_ISSUER_BASE_URL,
		baseURL: envFound.BASE_URL,
		clientID: envFound.AUTH0_CLIENT_ID,
		secret: envFound.JWT_SECRET,
		clientSecret: envFound.CLIENT_SECRET
	},
	audience: envFound.AUDIENCE,
	grantType: envFound.GRANT_TYPE,
	authzTokenUrl: envFound.AUTH0_TOKEN_URL,
	// Logs dev
	logs: {
		level: envFound.LOG_LEVEL || 'silly'
	},
	// Database
	db: {
		driver: envFound.DRIVER,
		user: envFound.USER,
		password: envFound.PASSWORD,
		database: envFound.DATABASE,
		ssl: envFound.SSL === 'true' ? true : false,
		host: envFound.HOST,
		schema: envFound.SCHEMA,
		port: parseInt(envFound.DBPORT)
	},
	// Endpoint prefix
	api: {
		prefix: '/api'
	},
	// Testing configs
	test: {
		resetDatabase: envFound.RESET_DATABASE === 'true' ? true : false
	}
}
