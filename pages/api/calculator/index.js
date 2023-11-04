export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // get query params ticker date and shares
      const { ticker, date, shares } = req.query;

      // fetch current ticker price, and available options expiring around the vesting date
      const currentPriceRes = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
        const currentPriceData = await currentPriceRes.json();
        const currentPrice = currentPriceData.results[0].c;

        const [upperBound, lowerBound] = [currentPrice * 1.01, currentPrice * 0.99]

      const optionsDataRes = await fetch(
          `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${ticker}&contract_type=put&strike_price.lt=${upperBound}&strike_price.gt=${lowerBound}&order=desc&limit=10&sort=strike_price&apiKey=${process.env.POLYGON_API_KEY}&expiration_date.gte=${date}`
        )

      const optionsData = await optionsDataRes.json()

      const optionsPriceRes = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${optionsData.results[0].ticker}/prev?adjusted=true&apiKey=bNw0ZH7rtsztK1sDOxQIppaM8o7IdlA8`
        );
       const optionsPriceData = await optionsPriceRes.json(); 

      const options = optionsData.results;

      console.log(currentPrice, options, optionsPriceData.results[0].c);

    // calculate the current value of the shares, and the estimated value of the options
    const currentValue = currentPrice * shares;
    const optionsPrice = optionsPriceData.results[0].c;
    const totalOptionsPrice = (shares / 100) * optionsPrice;
    const insuranceCost = totalOptionsPrice * 1.1;

      res.status(200).json({currentPrice, currentValue, optionsPrice, totalOptionsPrice, insuranceCost});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
