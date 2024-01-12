
import { Result, Button, message } from "antd";
import { Link, useParams } from "react-router-dom";
import http_common from "../../../http_common.ts";
import {useEffect, useState} from "react";

const DeletePage = () => {
    const { categoryId } = useParams();
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        const deleteCategory = async () => {
            try {
                setDeleting(true);
                await http_common.delete(`/api/categories/${categoryId}`);
                message.success("Категорію успішно видалено");
            } catch (error) {
                console.error("Помилка видалення категорії:", error);
                message.error("Не вдалося видалити категорію");
            } finally {
                setDeleting(false);
            }
        };

        deleteCategory();
    }, [categoryId]);

    return (
        <Result
            status="success"
            title="Категорію успішно видалено"
            extra={[
                <Button
                    type="primary"
                    key="home"
                    disabled={isDeleting}
                >
                    <Link to="/">На головну сторінку</Link>
                </Button>,
            ]}
        />
    );
};

export default DeletePage;
