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

		this.basePath = '/test-customers'
	}

	/**
	 * Get test customers
	 */
	async getTestCustomers() {
		try {
			return await this.client.do
				.get(`${this.basePath}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = TestCustomers
