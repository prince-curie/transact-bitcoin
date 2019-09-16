# transact-bitcoin
A graphQL api with a single query that returns the price of bitcoin depending on if the user wants to buy or sell, it queries the [coin desk API](https://www.coindesk.com/api "Coindesk api") to return the current price of bitcoin and then performs other computations based on the required input.


## Getting Started

- Clone the project
- Navigate into the folder called bitcoin_price fromyour terminal
- Run `npm install`
### Prerequisites

- nodeJS 
- A web browser

### Installing

- create a .env file
- copy the contents of .env.example into your .env file
- add this key and value to the .env file `COIN_DESK_API=https://api.coindesk.com/v1/bpi/currentprice/USD.json`
- run `adonis key:generate` to generate the app key
- run `adonis serve --dev` to start the server
- open your web browser and go to the address `http://127.0.0.1:3333/graphiql`
- A graphql playground for browsers appears, input the code snippet below
```javascript
query {
  transactBitcoin(
    type: "buy", 
    margin: 0.02, 
    exchangeRate: 300) {
    status
    message
  }
}
```

## Running the tests

- npm test

## Built With

* [Adonis Js](https://adonisjs.com/docs/4.1/installation) 

## Authors

- **Onwubiko Chibuike** 
