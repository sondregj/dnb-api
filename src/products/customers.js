/**
 * DNB Customers API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class Customers {
	constructor(client) {
		this.client = client

		this.basePath = '/customers'
	}

	async getCurrentCustomer() {
		try {
			return await this.client.do
				.get(`${this.basePath}/current`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Customers
