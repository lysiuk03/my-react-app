import React, {useEffect, useState} from "react";
import {ICategoryItem} from "./types.ts";
import type {ColumnsType} from "antd/es/table";
import {Button, Table} from "antd";
import http_common from "../../../http_common.ts";
import {APP_ENV} from "../../../env";
import {Link} from "react-router-dom";

// Оголошення функціонального компоненту CategoriesListPage
const CategoriesListPage : React.FC = () => {
    const [list,setList] = useState<ICategoryItem[]>(
        [
           // {
           //     id: 1,
           //     name: "Ковбаса",
          //      image: "https://catalog.rodynna-kovbaska.ua/wp-content/uploads/2021/01/kovbasa-krakivska.jpg"
           // }
        ]
    );
    const imagePath = `${APP_ENV.BASE_URL}/upload/150_`;
    const columns : ColumnsType<ICategoryItem> = [
        {
            title: "#",
            dataIndex: "id"
        },
        {
            title: "Назва",
            dataIndex: "name",
        },
        {
            title: "Фото",
            dataIndex: "image",
            render: (imageName: string) => {
                return (
                    <img src={`${imagePath}${imageName}`} alt="фото" width={100}/>
                );
            }
        },
    ];

    // Ефект для завантаження списку категорій при завантаженні компоненту
    useEffect(() => {
        //console.log("useEffect working");
        http_common.get<ICategoryItem[]>("/api/categories")
            .then(resp=> {
                console.log("Axios result", resp.data);
                setList(resp.data);
            });
    },[]);
    console.log("Render component");
    // Вивід компоненту
    return (
        <>
            <h1>Список категорій</h1>
            {/* Використання компонента Link для переходу на сторінку створення категорії */}
            <Link to="/create">
                {/* Використання компонента Button для створення кнопки */}
                <Button type="primary">
                    Додати категорію
                </Button>
            </Link>
            {/* Використання компонента Table для відображення списку категорій */}
            <Table columns={columns} rowKey={"id"} dataSource={list} size={"middle"} />
        </>
    )
}

// Експорт компоненту CategoriesListPage для використання в інших частинах програми
export default CategoriesListPage;