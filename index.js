import { getDividendYiled } from "./src/getData"

const dailyDividendYiledReport = async () => {
  const DividendYiled = await getDividendYiled("aapl")
  console.log("🚀 ~ file: index.js ~ line 5 ~ dailyDividendYiledReport ~ DividendYiled", DividendYiled)
}

dailyDividendYiledReport()