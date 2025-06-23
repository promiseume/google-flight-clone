import axios from "axios";

export const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api";

export const privateRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "x-rapidapi-key": "dfce299a75msh29b57254b31b008p1f6210jsnd50563791028",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});
