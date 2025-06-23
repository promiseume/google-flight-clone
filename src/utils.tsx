import axios from "axios";

const options = {
  method: "GET",
  url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
  params: {
    originSkyId: "LOND",
    destinationSkyId: "NYCA",
    originEntityId: "27544008",
    destinationEntityId: "27537542",
    cabinClass: "economy",
    adults: "1",
    sortBy: "best",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  },
  headers: {
    "x-rapidapi-key": "dfce299a75msh29b57254b31b008p1f6210jsnd50563791028",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
