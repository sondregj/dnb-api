/**
 * DNB Transactions API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class Transactions {
	constructor(client) {
		this.client = client

		this.basePath = '/transactions'
	}

	/**
	 * Get transactions from an account
	 * 
	 * @param {String} accountNumber to check
	 * @param {String} fromDate format 'YYYY-MM-DD'
	 * @param {String} toDate format 'YYYY-MM-DD'
	 */
	async getTransactions(accountNumber, fromDate, toDate) {
		const query = { fromDate, toDate }

		try {
			return await this.client.do.get(`${this.basePath}/${accountNumber}`, this.client.jwt, query)
		} catch (err) {
			throw err
		}
	}
}

module.exports = Transactions
