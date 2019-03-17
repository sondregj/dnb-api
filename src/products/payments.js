/**
 * DNB Payments API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class Payments {
	constructor(client) {
		this.client = client

		this.basePath = '/payments'
	}

	/**
	 * Initiate payment
	 * 
	 * @param {*} body object containing {debitAccountNumber, creditAccountNumber, kid, amount, currency} etc.
	 */
	async initiatePayment(body) {
		try {
			return await this.client.do
				.post(`${this.basePath}`, {}, body)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}


	/**
	 * Delete payment
	 * 
	 * @param {String} accountNumber 
	 * @param {String} paymentId 
	 */
	async deletePayment(accountNumber, paymentId) {
		try {
			return await this.client.do
				.delete(`${this.basePath}/${accountNumber}/pending-payments/${paymentId}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	/**
	 * Update existing payment
	 * 
	 * @param {String} accountNumber 
	 * @param {String} paymentId 
	 * @param {Object} body of request: { status, debitAccountNumber, amount, requestedExecutionDate }
	 */
	async updateExistingPayment(accountNumber, paymentId, body) {
		try {
			return await this.client.do
				.patch(`${this.basePath}/${accountNumber}/pending-payments/${paymentId}`, {}, body)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	/**
	 * Get due payments for an account
	 * 
	 * @param {String} accountNumber 
	 */
	async getDuePayments(accountNumber) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${accountNumber}/due`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	/**
	 * Get a due payment for an account
	 * 
	 * @param {String} accountNumber 
	 * @param {String} paymentId 
	 */
	async getDuePayment(accountNumber, paymentId) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${accountNumber}/due/${paymentId}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Payments
