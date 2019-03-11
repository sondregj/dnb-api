// Import API product handlers
const {	API, Accounts, Cards, Currencies, Customers, Locations,	Payments, Transactions,	TestCustomers } = require('./products')

/**
 * DNBApi
 * @param clientId of the application
 * @param clientSecret of the application
 * @param apiKey of the application
 * @param RequestHandler to use, use default
 * @returns API client
 */
class DNBApi {
	constructor(clientId, clientSecret, apiKey, RequestHandler = require('./http')) {
		this.clientId = clientId
		this.clientSecret = clientSecret
		this.apiKey = apiKey

		this.jwt = ''

		this.do = new RequestHandler({
			endpoint: 'developer-api-sandbox.dnb.no',
			awsRegion: 'eu-west-1',
			awsService: 'execute-api',
			clientId,
			clientSecret,
			apiKey
		})

		this.api = new API(this)
		this.accounts = new Accounts(this)
		this.cards = new Cards(this)
		this.currencies = new Currencies(this)
		this.customers = new Customers(this)
		this.locations = new Locations(this)
		this.payments = new Payments(this)
		this.transactions = new Transactions(this)
		this.testCustomers = new TestCustomers(this)
	}

	token(jwt) {
		this.jwt = jwt

		return this
	}
}

module.exports = DNBApi
