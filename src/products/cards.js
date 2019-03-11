/**
 * DNB Cards API
 * 
 * Requires JWT authentication
 * 
 * @param client to use
 */
class Cards {
	constructor(client) {
		this.client = client

		this.basePath = '/cards'
	}

	async getCards() {
		try {
			return await this.client.do.get(`${this.basePath}`, this.client.jwt)
		} catch (err) {
			throw err
		}
	}

	async getCard(id) {
		try {
			return await this.client.do.get(`${this.basePath}/${id}`, this.client.jwt)
		} catch (err) {
			throw err
		}
	}

	async getCardBalance(id) {
		try {
			return await this.client.do.get(`${this.basePath}/${id}/balance`, this.client.jwt)
		} catch (err) {
			throw err
		}
	}

	async blockCard(id) {
		try {
			return await this.client.do.put(`${this.basePath}/${id}/block`, this.client.jwt)
		} catch (err) {
			throw err
		}
	}

	async unblockCard(id) {
		try {
			return await this.client.do.put(`${this.basePath}/${id}/unblock`, this.client.jwt)
		} catch (err) {
			throw err
		}
	}
}

module.exports = Cards
