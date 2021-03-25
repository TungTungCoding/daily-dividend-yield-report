const createReport = (dividendYiledList) => {
  let html = `<h1>Daily Dividend Yiled Report</h1><br/><br/>`

  dividendYiledList.map(data => {
    const { symbol, dividendYiled, monthlyDividend } = data
    html += `<div><strong>${symbol}</strong> : ${dividendYiled}</div>`;

    monthlyDividend.map(dividend => {
      html += `<div>${dividend}</div>`
    })
    html += `<br/>`
  })

  return html
}

export default createReport