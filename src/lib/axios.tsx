import axios from "axios";

export const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api";

export const privateRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "x-rapidapi-key": "994d0fa39fmshccc927a0a3f09cep17e145jsn25bf458af6d5",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});
