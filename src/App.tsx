import {Route, Routes} from "react-router-dom";
import ContainerDefault from "./components/containers/default/ContainerDefault.tsx";
import CategoriesListPage from "./components/categories/list/CategoriesListPage.tsx";
import NoMatch from "./components/pages/NoMatch.tsx";
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/categories/edit/CategoryEditPage.tsx";
import CategoryDeletePage from "./components/categories/delete/CategoryDeletePage.tsx";
import RegisterPage from "./components/auth/register/RegisterPage.tsx";
import ProductListPage from "./components/products/list/ProductsListPage.tsx";
import ProductCreatePage from "./components/products/create/ProductCreatePage.tsx";



// Оголошення головного компоненту App
const App: React.FC = () => {

    return (
        <>
            {/* Визначення маршрутів за допомогою компонента Routes */}
            <Routes>
                <Route path="/" element={<ContainerDefault />}>
                    <Route index element={<CategoriesListPage />} />
                    <Route path={'create'} element={<CategoryCreatePage />} />
                    <Route path="/edit/:categoryId" element={<CategoryEditPage />} />
                    <Route path="/delete/:categoryId" element={<CategoryDeletePage />} />
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/products" element={<ProductListPage />} />
                    <Route path="/product/create" element={<ProductCreatePage/>} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    );
};
// Експорт головного компоненту App для використання в інших частинах програми
export default App;