import Product from './product'

const Fixtures = {
	Product,
	createAll: async () => {
		try {
			return await Product.createAll()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in createAll()')
		}
	},
	resetAll: async () => {
		try {
			return await Product.reset()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in resetAll()')
		}
	}
}

export default Fixtures
