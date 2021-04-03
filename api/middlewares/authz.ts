import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import config from '../../loaders/configs'

export const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: config.authzTokenUrl
	}),
	audience: config.audience,
	issuer: config.authz.issuerBaseURL,
	algorithms: ['RS256']
})
