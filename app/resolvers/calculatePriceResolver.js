const fetch = require('node-fetch')
const Env = use('Env')

const coinDeskApi = Env.get("COIN_DESK_API")

const coinDeskApiPriceResponse = () => fetch(coinDeskApi, {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => data.bpi.USD.rate_float)

const bitcoinTransactionPrice = (margin, currentBitcoinPrice) => {
  return ((margin / 100) * currentBitcoinPrice) + currentBitcoinPrice
}

let computedBitcoinPrice

const resolvers = {
  Query: {
    transactBitcoin: async (parent, args, ctx, info) => {
      try {
        const { type, margin, exchangeRate } = args
        const lowerCaseType = type.toLowerCase()

        if (lowerCaseType !== 'buy' && lowerCaseType !== 'sell') {
          return ({
            status: "Fail",
            message: "type should be either buy or sell"
          })
        }

        const currentBitcoinPrice = await coinDeskApiPriceResponse()

        if (lowerCaseType === "buy") {
          computedBitcoinPrice = bitcoinTransactionPrice(margin, currentBitcoinPrice)
        }
        else if (lowerCaseType === "sell") {
          computedBitcoinPrice = bitcoinTransactionPrice(-margin, currentBitcoinPrice)
        }

        const computedBitcoinPriceInNaira = (
          computedBitcoinPrice * exchangeRate
        ).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })

        return ({
          status: 'Success',
          message: `The price is ${computedBitcoinPriceInNaira} per bitcoin`
        })

      } catch (error) {
        return {
          status: "fail",
          message: error.message
        }
      }
    }
  }
}

module.exports = resolvers