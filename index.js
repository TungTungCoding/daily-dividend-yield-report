import { stockSymbolList } from "./config/stockSymbolList"
import getData from "./src/getData"

const dailyDividendYiledReport = async () => {
  const DividendYiledList = await getData(stockSymbolList)
  console.log("🚀 ~ file: index.js ~ line 6 ~ dailyDividendYiledReport ~ DividendYiledList", DividendYiledList)

}

dailyDividendYiledReport()