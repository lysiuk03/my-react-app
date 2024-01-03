import {Route, Routes} from "react-router-dom";
import ContainerDefault from "./components/containers/default/ContainerDefault.tsx";
import CategoriesListPage from "./components/categories/list/CategoriesListPage.tsx";
import NoMatch from "./components/pages/NoMatch.tsx";
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx";

// Оголошення головного компоненту App
const App: React.FC = () => {

    return (
        <>
            {/* Визначення маршрутів за допомогою компонента Routes */}
            <Routes>
                <Route path="/" element={<ContainerDefault />}>
                    <Route index element={<CategoriesListPage />} />
                    <Route path={'create'} element={<CategoryCreatePage />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    );
};
// Експорт головного компоненту App для використання в інших частинах програми
export default App;