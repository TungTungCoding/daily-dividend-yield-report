import axios from "axios"
import cheerio from "cheerio"

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
  for (let symbol of stockSymbolList) {
    const dividendYiled = await getDividendYiled(symbol)
    dividendYiledList.push({ symbol, dividendYiled })
  }
  return dividendYiledList
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




