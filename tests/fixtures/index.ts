import Post from './post'
import User from './user'

const Fixtures = {
	User,
	Post,
	createAll: async () => {
		try {
			await User.createAll()
			return await Post.createAll()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in createAll()')
		}
	},
	resetAll: async () => {
		try {
			await User.reset()
			return await Post.reset()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in resetAll()')
		}
	}
}

export default Fixtures
