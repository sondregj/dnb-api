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
	 * 
	 * @param {*} body object containing {debitAccountNumber, creditAccountNumber, kid, amount, currency} etc.
	 */
	async initiatePayment(body) {
		try {
			return await this.client.do.post(`${this.basePath}`, this.client.jwt, {}, body)
		} catch (err) {
			throw err
		}
	}

	async deletePayment(accountNumber, paymentId) {
		const query = {

		}

		try {
			return await this.client.do.delete(`${this.basePath}/${accountNumber}/pending-payments/${paymentId}`, )
		} catch (err) {

		}
	}

	async updateExistingPayment() {

	}

	async getDuePayments(account) {

	}

	async getDuePayment(id) {

	}
}

module.exports = Payments
