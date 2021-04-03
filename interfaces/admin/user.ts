interface IUser {
	id?: number
	email: string
	givenName?: string
	familyName?: string
	nickname?: string
	name?: string
	firm?: string
	picture?: string
	locale?: string
	is_deleted?: boolean
	updatedAt?: Date
	createdAt?: Date
}

export { IUser }
