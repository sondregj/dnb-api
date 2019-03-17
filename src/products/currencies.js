/**
 * DNB Payments API
 * 
 * Does not require JWT authentication
 * 
 * @param client to use
 */
class Currencies {
	constructor(client) {
		this.client = client

		this.basePath = '/currencies'
	}

	async getCurrencyRateList(fromCurrency) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${fromCurrency}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async getCurrencyRate(fromCurrency, toCurrency) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${fromCurrency}/convert/${toCurrency}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Currencies
