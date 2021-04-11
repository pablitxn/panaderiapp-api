export interface IProduct {
	id?: number
	name: string
	available: boolean
	isDeleted?: boolean
	updatedAt?: Date
	createdAt?: Date
}

type fieldSpec = {
	field: string
	map?: string
	render: boolean
	deshydrate?: boolean
	required: boolean
	type?: 'Number' | 'Boolean'
}

export const fieldSpec: fieldSpec[] = [
	{
		field: 'id',
		render: true,
		required: false,
		type: 'Number'
	},
	{
		field: 'name',
		render: true,
		required: true
	},
	{
		field: 'available',
		render: true,
		required: true,
		type: 'Boolean'
	},
	{
		field: 'isDeleted',
		map: 'is_deleted',
		deshydrate: true,
		render: true,
		required: false
	},
	{
		field: 'updatedAt',
		map: 'updated_at',
		deshydrate: true,
		render: true,
		required: false
	},
	{
		field: 'createdAt',
		map: 'created_at',
		deshydrate: true,
		render: true,
		required: false
	}
]
