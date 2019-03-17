/**
 * DNB Accounts API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class Accounts {
	constructor(client) {
		this.client = client

		this.basePath = '/accounts'
	}

	async getAccounts() {
		try {
			return await this.client.do
				.get(`${this.basePath}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async getAccountDetails(accountNumber) {

		try {
			return await this.client.do
				.get(`${this.basePath}/${accountNumber}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async getAccountBalance(accountNumber) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${accountNumber}/balance`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Accounts
