type Limit = number | null
type Offset = number | null

export const requestHelper = (req: any) => {
	const { query, params, body } = req

	let limit: Limit
	let offset: Offset
	if (query.offset === undefined) offset = null
	if (query.limit === undefined) limit = null

	if (query.offset !== undefined) {
		offset = parseInt(query.offset)
	}
	if (query.limit !== undefined) {
		limit = parseInt(query.limit)
	}

	const id = parseInt(req.params.id)

	return {
		limit,
		offset,
		id,
		body
	}
}
