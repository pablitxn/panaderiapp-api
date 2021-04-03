// @ts-nocheck
import assert from 'assert'

class TestHelper {
	static checkValidationErrors(fields) {
		return (res) => {
			fields.forEach((f) => {
				if (!res.body.validation_errors.some((e) => e.field == f)) {
					console.log('Error for field: ' + f)
					console.log(res.body.validation_errors)
				}
				assert(
					res.body.validation_errors.some((e) => e.field == f),
					`Missing validation error: ${f}`
				)
				assert.equal(res.body.validation_errors.length, fields.length)
			})
		}
	}

	// Like expect, except it prints the specific errors
	static checkStatus(statusCode) {
		return (res) => {
			if (statusCode !== 400 && res.body.validation_errors) {
				console.error('Validation Errors: ', res.body.validation_errors)
			}
			assert.equal(res.status, statusCode)
			return res
		}
	}
}

export default TestHelper
