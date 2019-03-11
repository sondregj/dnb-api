/**
 * DNB TestCustomers API
 * 
 * Does not require JWT authentication
 * 
 * @param client to use
 */
class TestCustomers {
	constructor(client) {
		this.client = client

		this.basePath = '/testCustomers'
	}

	async getTestCustomers() {
		try {
			return await this.client.do.get(`${this.basePath}`)
		} catch (err) {
			throw err
		}
	}
}

module.exports = TestCustomers
