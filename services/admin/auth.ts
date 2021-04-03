import AuthModel from '../../models/admin/auth'

class Auth {
	static async syncUser(payload: any) {
		try {
			// const isNewUser = await AuthModel.validate(payload)
			// let record
			// if (isNewUser) record = await AuthModel.update(payload)
			// if (!isNewUser) record = await AuthModel.create(payload)
			const [record] = await AuthModel.create(payload)

			const response = AuthModel.hydrate(record)
			return response
		} catch (err) {
			return err
		}
	}
}

export default Auth
