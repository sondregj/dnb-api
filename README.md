[![Travis Build Status](https://img.shields.io/travis/sondregj/dnb-api-client.svg?style=flat-square)](https://travis-ci.org/sondregj/dnb-api-client)
[![gitmoji badge](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji)

# DNB Open Banking Client

> A client for DNB's various API products. *(Under development)*

The APIs are currently under development, and only available in a sandbox. To use this API, you have to create an application on [https://developer.dnb.no](https://developer.dnb.no).

See examples below

## Usage

All the functions are asynchronous and return promises.

```javascript
const DNBApi = require('dnb-api-client')

const api = new DNBApi('CLIENT_ID', 'CLIENT_SECRET', 'API_KEY')

const fetchCustomerData = async () => {
  const jwt = await api.getToken('SSN', '12345678910')

  return await api.token(jwt).customers.getCustomerInfo()
}

fetchCustomerData()
  .then((customer) => console.log(`${customer.firstName} ${customer.lastName}`))
  .catch((err) => console.log(err.message))
```

For more examples see below.

## Examples

## Development

## Testing

## License

MIT (c) 2019 Sondre Gjellestad
