export interface IPost {
	id?: number
	title: string
	subTitle?: string
	author?: string
	srcBackground?: string
	altBackground?: string
	imgAuthor?: string
	briefHeader?: string
	article: string
	isDeleted?: boolean
	isDraft?: boolean
	updatedAt?: Date
	createdAt?: Date
}

type fieldSpec = {
	field: string
	map?: string
	render: boolean
	deshydrate?: boolean
	required?: boolean
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
		field: 'title',
		render: true,
		required: true
	},
	{
		field: 'subTitle',
		map: 'sub_title',
		render: true,
		deshydrate: true,
		required: false
	},
	{
		field: 'author',
		render: true,
		required: false
	},
	{
		field: 'srcBackground',
		map: 'src_background',
		deshydrate: true,

		render: true,
		required: false
	},
	{
		field: 'altBackground',
		map: 'alt_background',
		deshydrate: true,
		render: true,
		required: false
	},
	{
		field: 'imgAuthor',
		map: 'img_author',
		render: true,
		required: false
	},
	{
		field: 'briefHeader',
		map: 'brief_header',
		deshydrate: true,

		render: true,
		required: false
	},
	{
		field: 'article',
		render: true,
		required: true
	},
	{
		field: 'isDeleted',
		map: 'is_deleted',
		deshydrate: true,
		render: true,
		required: false
	},
	{
		field: 'isDraft',
		map: 'is_draft',
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
		render: true,
		required: false
	}
]
