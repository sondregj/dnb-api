const Aika = require('aika')
const headerBuilder = require('./aika/headerbuilder')

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
	constructor(clientId, clientSecret, apiKey) {
		this.clientId = clientId
		this.clientSecret = clientSecret
		this.apiKey = apiKey

		this.dnbToken = {
			jwt: ''
		}

		// Initialize HTTP client
		this.do = new Aika({
			host: 'developer-api-sandbox.dnb.no'
		})

		// Add Aws signing middleware
		this.do.use(headerBuilder({
			clientId,
			clientSecret,
			apiKey,
			token: this.dnbToken,
			hostName: 'developer-api-sandbox.dnb.no',
			awsRegion: 'eu-west-1',
			awsService: 'execute-api'
		}))

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
		this.dnbToken.jwt = jwt

		return this
	}
}

module.exports = DNBApi
