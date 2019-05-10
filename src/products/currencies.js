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

		this.basePath = '/currencies/v1'
	}

	async getCurrencyRateList(fromCurrency) {
		try {
			return await this.client.do
				.get(`${this.basePath}/convert/${fromCurrency}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}

	async getCurrencyRate(baseCurrency, quoteCurrency) {
		try {
			return await this.client.do
				.get(`${this.basePath}/${baseCurrency}/convert/${quoteCurrency}`)
				.then(obj => obj.json())
		} catch (err) {
			throw err
		}
	}
}

module.exports = Currencies
