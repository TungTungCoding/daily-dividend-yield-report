import axios from "axios"
import cheerio from "cheerio"

// https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey=demo
/*
{
    "Monthly Adjusted Time Series": {
        "2021-03-19": {
            "1. open": "120.3500",
            "2. high": "130.9950",
            "3. low": "118.7550",
            "4. close": "128.9000",
            "5. adjusted close": "128.9000",
            "6. volume": "89961618",
            "7. dividend amount": "0.0000"
        },
*/

const getMonthlyDividend = async (symbol) => {
  const monthlyDividend = []
  const key = process.env.ALPHAVANTAGE_KEY
  return await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${key}`).then(response => {
    const data = response.data["Monthly Adjusted Time Series"]
    if (data) {
      const dateList = Object.keys(data).splice(1, 13)
      dateList.map(date => {
        const dividendAmount = data[date]["7. dividend amount"]
        dividendAmount !== "0.0000" && monthlyDividend.push(`${date} : ${dividendAmount}`)
      })
    }
    return monthlyDividend
  })
}

export const getDividendYiled = async (symbol) => {
  return await axios.get(`https://www.marketbeat.com/stocks/NASDAQ/${symbol}/dividend/`)
    .then(html => {
      const $ = cheerio.load(html.data)
      const dividendYiled = $("div.price-data-col:nth-child(3) div.price-data:nth-child(2) strong").text()

      if (dividendYiled === "N/A") {
        return "currently no dividends"
      } else if (dividendYiled === "") {
        return "no data exist"
      } else {
        return dividendYiled
      }
    }).catch(() => {
      return "Error occurred during web crawling process"
    })
}

const getData = async (stockSymbolList) => {
  let dividendYiledList = []
  const stockSymbolListLength = stockSymbolList.length
  for (let symbol of stockSymbolList) {
    const dividendYiled = await getDividendYiled(symbol)
    const monthlyDividend = await getMonthlyDividend(symbol)
    dividendYiledList.push({ symbol, dividendYiled, monthlyDividend })
    stockSymbolListLength >= 5 && await delay(12)
  }
  return dividendYiledList
}

const delay = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export default getData

/*
// 아래의 크롤링 코드는 값을 읽어오지 못합니다.
// https://www.nasdaq.com/market-activity/stocks/aapl/dividend-history
//li.dividend-history__summary-item:nth-child(2)>span.dividend-history__summary-item__value>span
export const getDividendYiled = async (symbol) => {
  return await axios.get(`https://www.nasdaq.com/market-activity/stocks/${symbol}/dividend-history`)
    .then(html => {
      const $ = cheerio.load(html.data)
      return $("li.dividend-history__summary-item:nth-child(2)").html()
    })
}
*/




