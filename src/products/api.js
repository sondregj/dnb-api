class API {
	constructor(apiObject) {
		this.apiObject = apiObject
	}

	async getToken(idType, customerId) {
		const query = {
			type: idType,
			value: customerId
		}

		return 'Hello'
	}
}

module.exports = API
