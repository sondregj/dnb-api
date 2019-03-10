class Customers {
	constructor(apiObject) {
		this.apiObject = apiObject
	}

	async getCurrentCustomer() {
		try {
			return await this.apiObject.requestHandler.get('/customers/current')
		} catch (err) {
			throw err
		}
	}
}

module.exports = Customers
