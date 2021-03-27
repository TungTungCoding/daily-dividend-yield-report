import { stockSymbolList } from "./config/stockSymbolList"
import getData from "./src/getData"
import path from "path"
import dotenv from "dotenv"
import createReport from "./src/createReport"
import sendEmail from "./src/sendEmail"

dotenv.config({ path: path.join(__dirname, ".env") })

const dailyDividendYiledReport = async () => {
  const dividendYiledList = await getData(stockSymbolList)
  console.log("🚀 ~ file: index.js ~ line 10 ~ dailyDividendYiledReport ~ dividendYiledList", dividendYiledList)

  const report = createReport(dividendYiledList)
  console.log("🚀 ~ file: index.js ~ line 14 ~ dailyDividendYiledReport ~ report", report)

  sendEmail(report)
}

dailyDividendYiledReport()