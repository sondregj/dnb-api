const test = require('ava')

const DNBApi = require('../../src')

test.before(async t => {
	if (process.env.NODE_ENV !== 'CI') {
		require('dotenv').config()
	}

	t.context.client = new DNBApi(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.API_KEY)
	t.context.testCustomerSSN = await t.context.client.testCustomer.getTestCustomer().customers[0].ssn
	t.context.token = await t.context.client.api.getToken('SSN', t.testCustomerSSN)
})

test.todo('Get accounts'/*, async t => {
	const data = t.context.client.token(t.context.token).accounts.getAccounts()
	
	t.is((await data).accounts[0].productName, 'BRUKSKONTO')
}*/)

test.todo('Get account details'/*, async t => {
	const accountNumber = '12003189487'
	const data = t.context.client.token(t.context.token).accounts.getAccountDetails(accountNumber)

	t.is((await data).currency, 'NOK')
}*/)


test.todo('Get account balance'/*, async t => {
	t.pass()
}*/)
