import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Імпорт компонента для налаштування маршрутизації (BrowserRouter)
import {BrowserRouter} from "react-router-dom";
// Використання методу createRoot для відображення компоненту в кореневому елементі з ідентифікатором 'root'
ReactDOM.createRoot(document.getElementById('root')!).render(
    // Обгортка додатка в компонент BrowserRouter для підтримки маршрутизації
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
)