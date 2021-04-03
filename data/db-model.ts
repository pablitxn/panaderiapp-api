import CustomError from './custom-error'
const DB_VALIDATION_ERR_CODE = 22000

// TODO: mejorar tipado
class ModelDB {
	static findOneHandler(res, rej, mapper = null) {
		return ModelDB.findHandler(res, rej, mapper, false)
	}

	static findManyHandler(res, rej, mapper = null) {
		return ModelDB.findHandler(res, rej, mapper, true)
	}

	static findHandler(res, rej, mapper = null, arr = false) {
		return (err, result) => {
			if (err) {
				if (err.code == DB_VALIDATION_ERR_CODE) {
					const errors = [{ field: err.hint, message: err.message }]
					err = CustomError.validationError(errors)
				}
				rej(err)
			} else {
				if (mapper) result.forEach(mapper)
				if (arr) res(result)
				else res(result[0])
			}
		}
	}

	static validateId(id: string, field = 'id') {
		if (isNaN(parseInt(id)) && id !== null) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateTimestamp(dateStr: Date, field = 'timestamp') {
		const date = new Date(dateStr)
		if (!date) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateUuid(uuid: string, field = 'uuid') {
		// https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
		if (
			!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
				uuid
			)
		) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateString(str: string, field = 'name', allowEmpty = false) {
		if (typeof str === 'string') {
			if (str === '' && !allowEmpty) {
				const errors = [{ field, message: 'is empty' }]
				throw CustomError.validationError(errors)
			}
		} else {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateDateString(dateStr: string, field: string) {
		const date = new Date(dateStr)
		if (isNaN(date.getTime())) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateNumericDate(dateNum: number, field = 'date') {
		ModelDB.validateNumeric(dateNum, field)
	}

	static validateNumeric(num: number, field = 'id') {
		if (isNaN(num)) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateBool(boolVal: any, field: string) {
		let result = false
		if (boolVal !== undefined && boolVal !== null) {
			if (boolVal.constructor.name === 'String') {
				result = boolVal.toLowerCase() === 'true' || boolVal.toLowerCase() === 'false'
			} else {
				result = boolVal === true || boolVal === false
			}
		}

		if (!result) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}

	static validateArray(arr: Array<any>, field = 'array') {
		if (!Array.isArray(arr)) {
			const errors = [{ field, message: 'is invalid' }]
			throw CustomError.validationError(errors)
		}
	}
}

export default ModelDB
