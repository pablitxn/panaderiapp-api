const validationErrorMessage = 'Validation Failed'
const authenticationErrorMessage = 'Authentication Failed'

class CustomError {
	message: string
	// TODO: mejorar esto y especificar
	statusCode: number
	payload?: any
	kind?: string

	constructor({
		message,
		statusCode,
		payload,
		kind
	}: {
		message: string
		statusCode: number
		payload?: any
		kind?: string
	}) {
		this.message = message
		this.statusCode = statusCode
		this.payload = payload
		this.kind = kind ? kind : 'error'
	}

	static validationError(errors) {
		return new CustomError({
			message: validationErrorMessage,
			statusCode: 400,
			payload: {
				message: validationErrorMessage,
				validation_errors: errors
			}
		})
	}

	static resourceNotFound(errorMsg) {
		return new CustomError({
			message: errorMsg || 'Resource Not Found',
			statusCode: 404
		})
	}

	static authenticationError() {
		return new CustomError({
			message: authenticationErrorMessage,
			statusCode: 401,
			payload: {
				message: authenticationErrorMessage
			}
		})
	}
}

export default CustomError
