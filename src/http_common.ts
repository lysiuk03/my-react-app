import axios from "axios";
import {APP_ENV} from "./env";

//console.log("URL", APP_ENV.BASE_URL);
// Створення інстансу axios для використання в програмі
const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,// Встановлення основного URL для всіх запитів
    headers: {
        "Content-Type": "application/json" // Встановлення заголовка Content-Type для JSON-даних
    }
});
// Експорт створеного інстансу для використання в інших частинах програми
export default  http_common;