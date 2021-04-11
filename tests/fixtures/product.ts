import Fixture from './fixture-model'

const Product1 = {
	name: 'Fermentum',
	available: true,
	is_deleted: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Product2 = {
	name: 'Malesueada',
	available: true,
	is_deleted: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Product3 = {
	name: 'Leectus hac',
	available: false,
	is_deleted: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Product4 = {
	name: 'Hac',
	available: false,
	is_deleted: true,
	updated_at: new Date(),
	created_at: new Date()
}

const Product5 = {
	name: 'Fermentum Hac',
	available: true,
	is_deleted: true,
	updated_at: new Date(),
	created_at: new Date()
}

const Posts: any = Fixture.register('product', {
	Product1,
	Product2,
	Product3,
	Product4,
	Product5
})

export default Posts
