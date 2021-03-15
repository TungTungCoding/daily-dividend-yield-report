

import axios from "axios"
import cheerio from "cheerio"

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