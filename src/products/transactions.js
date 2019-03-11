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
	}

	async getTransactions(account) {
		
	}
}

module.exports = Transactions
