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
	}

	async getCurrentCustomer() {
		try {
			return await this.client.do
				.get('/customers/current')
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Customers
