# DNB Open Banking Client

> A client for DNB's various API products. *(Under development)*

## Usage

All the functions are asynchronous and return promises.

```javascript
const DNBApi = require('dnb-api-client')

const api = new DNBApi('CLIENT_ID', 'CLIENT_SECRET', 'API_KEY')

const fetchData = async () => {
	const jwt = await api.getToken('SSN', '12345678910')

	return await api.customers.getCustomerInfo(jwt)
}

fetchCustomerData()
	.then((customer) => console.log(`${customer.firstName} ${customer.lastName}`))
	.catch((err) => console.log(err.message))
```

## Development

## Testing
