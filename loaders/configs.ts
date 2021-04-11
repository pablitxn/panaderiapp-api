import dotenv from 'dotenv'
import fs from 'fs'

const TEST = 'test'
const DEV = 'development'
const ENV = process.env.NODE_ENV

let envFound

switch (ENV) {
	case TEST:
		envFound = dotenv.parse(fs.readFileSync('.env.test'))
		break
	case DEV:
		envFound = dotenv.parse(fs.readFileSync('.env.dev'))
		break
	default:
		envFound = {
			PORT: process.env.PORT,
			BASE_URL: process.env.BASE_URL,
			DRIVER: process.env.DRIVER,
			USER: process.env.USER,
			PASSWORD: process.env.PASSWORD,
			DATABASE: process.env.DATABASE,
			SSL: process.env.SSL,
			HOST: process.env.HOST,
			SCHEMA: process.env.SCHEMA,
			DBPORT: process.env.DBPORT,
			URI: process.env.URI,
			error: false
		}
		break
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
		ssl: { rejectUnauthorized: false },
		host: envFound.HOST,
		schema: envFound.SCHEMA,
		port: parseInt(envFound.DBPORT),
		URI: envFound.URI
	},
	// Endpoint prefix
	api: {
		prefix: '/api/v1'
	},
	// Testing configs
	test: {
		resetDatabase: envFound.RESET_DATABASE === 'true' ? true : false
	}
}
