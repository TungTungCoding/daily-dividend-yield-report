import { stockSymbolList } from "./config/stockSymbolList"
import getData from "./src/getData"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.join(__dirname, ".env") })

const dailyDividendYiledReport = async () => {
  const DividendYiledList = await getData(stockSymbolList)
  console.log("🚀 ~ file: index.js ~ line 6 ~ dailyDividendYiledReport ~ DividendYiledList", DividendYiledList)

}

dailyDividendYiledReport()