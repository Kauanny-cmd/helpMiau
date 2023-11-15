import axios from "axios";
import {API_URL, KEY_URL} from "@env"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'apikey': KEY_URL,
        'Authorization': `Bearer ${KEY_URL}`,
      },
});