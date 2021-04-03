import Fixture from './fixture-model'

const Admin = {
	given_name: 'Admin Test',
	family_name: 'test',
	name: 'test',
	nickname: 'test_admin',
	email: 'test_admin@test.com',
	firm: 'fermentum malesuada fames suspendisse lectus hac.',
	picture: 'url//image',
	brief_description: 'fermentum malesuada fames suspendisse lectus hac.',
	updated_at: new Date(),
	created_at: new Date()
}

const User1 = {
	given_name: 'User 1',
	family_name: 'test',
	name: 'test',
	nickname: 'test_user_1',
	email: 'test_user_1@test.com',
	firm: 'fermentum malesuada fames suspendisse lectus hac.',
	picture: 'url//image',
	brief_description: 'fermentum malesuada fames suspendisse lectus hac.',
	updated_at: new Date(),
	created_at: new Date()
}

const User2 = {
	given_name: 'User 2',
	family_name: 'test',
	name: 'test',
	nickname: 'test_user_2',
	email: 'test_user_2@test.com',
	firm: 'fermentum malesuada fames suspendisse lectus hac.',
	picture: 'url//image',
	brief_description: 'fermentum malesuada fames suspendisse lectus hac.',
	updated_at: new Date(),
	created_at: new Date()
}

const Users: any = Fixture.register('user_', { Admin, User1, User2 })

export default Users
