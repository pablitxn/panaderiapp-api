// @ts-nocheck
// const CustomError = require('../util/CustomError')

const modelsMap = {}

type fieldSpec = {
	field: string
	map?: string
	render: boolean
	deshydrate?: boolean
	required?: boolean
	type?: 'Number' | 'Boolean'
}

class Model {
	fieldSpec: fieldSpec[]
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * TODO:
	 * understand constructor
	 * inflate, render. and the rest of the methods
	 */
	//////////////////////////////////////////////////////////////////////////////
	constructor(fieldSpec: fieldSpec[], fields: any) {
		this.__constructor = this.constructor.name
		this.isNew = this.isNew.bind(this)
		this.inflate = this.inflate.bind(this)
		this.validate = this.validate.bind(this)
		this.render = this.render.bind(this)
		this.hydrate = this.hydrate.bind(this)

		this.fieldSpec = fieldSpec
		fieldSpec.forEach((spec) => {
			spec.map = spec.map || spec.field
		})

		this.inflate(fields)
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 *
	 * TODO:
	 *  in which cases use this method?
	 * 	is it okay to use the public and static in register()?
	 */
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Keep a map of model classes in memory that we can use to
	 * deserialize models using their __constructor property
	 * @param Model
	 * @returns void
	 */
	public static register(Model: any): void {
		modelsMap[Model.name] = Model
	}
	/**
	 * Verify if the instance is a new element within the db
	 * through its ID property
	 * @returns boolean
	 */
	isNew() {
		return !this.id
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 *
	 * TODO:
	 *  what does this method do?
	 */
	//////////////////////////////////////////////////////////////////////////////
	inflate(fields) {
		this.id = fields.id
		this.createdAt = fields.created_at

		this.fieldSpec.forEach((spec) => {
			const newVal = fields[spec.map]
			this[spec.field] = newVal
		})
		return this
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 * WIP: in the test state to see that this methods will be useful
	 *
	 */
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Serialize from CamelCase to Snake_Case
	 * @param options - exclude properties
	 * @returns A model instance with all properties in CamelCase
	 */
	public static deshydrate(fields: any, fieldSpec: fieldSpec[]) {
		let fieldsDeshydrated: any
		const isNew = () => fields.id === undefined

		fieldSpec.forEach((spec) => {
			if (spec.map) {
				fieldsDeshydrated = {
					...fieldsDeshydrated,
					[spec.map]: fields[spec.field]
				}
			} else {
				fieldsDeshydrated = {
					...fieldsDeshydrated,
					[spec.field]: fields[spec.field]
				}
			}
		})

		if (isNew) {
			delete fieldsDeshydrated.is_deleted
			delete fieldsDeshydrated.updated_at
			delete fieldsDeshydrated.created_at
			delete fieldsDeshydrated.id
		}
		return fieldsDeshydrated
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 * TODO: test and implement
	 */
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Serialize Snake_Case to Camel Case
	 * @param post
	 */
	hydrate() {
		const renderFields = this.render()
		const fieldsFormatted = this.inflate(renderFields)
		delete fieldsFormatted.__constructor
		delete fieldsFormatted.fieldSpec
		return fieldsFormatted
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 * TODO: test and implement
	 */
	//////////////////////////////////////////////////////////////////////////////
	validate(silent = false) {
		//Check for missing fields that are required
		let errors = this.fieldSpec
			.filter((s) => s.required && (this[s.field] === undefined || this[s.field] === ''))
			.map((s) => ({ field: s.map, message: 'is missing' }))

		//Check for fields that are invalid types
		this.fieldSpec
			.filter(
				(s) =>
					!(s.required && this[s.field] === '') &&
					this[s.field] !== undefined &&
					this[s.field] !== null &&
					((s.type && this[s.field].constructor.name !== s.type) ||
						(s.type === 'Number' && isNaN(this[s.field])) ||
						(s.type === 'String' && this[s.field] === '' && s.isNotEmptyString !== false))
			)
			.map((s) => ({ field: s.map, message: 'is invalid' }))
			.forEach((e) => errors.push(e))

		if (this.id !== undefined && isNaN(this.id)) {
			errors.push({ field: 'id', message: 'is invalid' })
		}

		if (!silent && errors.length > 0) throw CustomError.validationError(errors)

		return errors
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Populate path through instances of other objects
	 * @param field - intance model and field to populate
	 * @returns Model
	 */
	async populatePath() {
		return this
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Populate paths through instances of other objects
	 * @param fields - Array with intance models and fields to populate
	 * @returns Model
	 */
	async populate(...fields) {
		await Promise.all(fields.map((field) => this.populatePath(field)))
		return this
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 * TODO:
	 * understand that this method does
	 */
	//////////////////////////////////////////////////////////////////////////////
	render(options = {}) {
		let fields = {}
		options.exclude = options.exclude || []

		if (!this.isNew() && !options.exclude.includes('id')) {
			fields.id = this.id
		}

		this.fieldSpec
			.filter((s) => s.render)
			.forEach((spec) => {
				const val = this[spec.field]
				if (val != undefined && !options.exclude.includes(spec.field)) {
					if (Array.isArray(val)) {
						fields[spec.map] = val.map((m) => (m.render ? m.render() : m))
					} else {
						fields[spec.map] = val.render ? val.render() : val
					}
				}
			})

		return fields
	}
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////
	/**
	 * TODO:
	 * understand that this method does
	 */
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * Recurse through a model and deserialize it using its saved constructor prop
	 * Necessary because serializing obliterates its methods (such as render())
	 * @param record - db record
	 * @returns record
	 */
	static modelify(record) {
		// recursively apply to all members of this, depth-first
		if (record instanceof Object) {
			if (record instanceof Array) {
				record.forEach((v, i) => {
					record[i] = Model.modelify(v)
				})
			} else {
				for (let prop in record) {
					record[prop] = Model.modelify(record[prop])
				}

				if (!!record.__constructor) {
					Model.uninflate(record)
					record = Reflect.construct(modelsMap[record.__constructor], [record])
				}
			}
		}
		return record
	}
}

export default Model