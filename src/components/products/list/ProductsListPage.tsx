// ... (імпорти)

import { Card, Carousel } from "antd";
import {APP_ENV} from "../../../env";
import {IProductItem} from "./types.ts";
import http_common from "../../../http_common.ts";
import {useEffect, useState} from "react";

const ProductListPage: React.FC = () => {
    const [list, setList] = useState<IProductItem[]>([]);

    useEffect(() => {
        http_common.get<IProductItem[]>("/api/products").then((resp) => {
            setList(resp.data);
        });
    }, []);

    const imagePath = `${APP_ENV.BASE_URL}/upload/600_`;

    return (
        <div style={{ height: '100%', overflowY: 'scroll' }}>
            <h1>Список продуктів</h1>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {list.map((product) => (
                    <Card
                        key={product.id}
                        style={{ width: 300, margin: "16px", background: '#f0f0f0' }}
                        cover={
                            product.product_images && product.product_images.length > 0 ? (
                                <Carousel effect="fade">

                                    {product.product_images.map((image, index) => (
                                        <div key={index} >
                                            <img
                                                src={`${imagePath}${image.name}`}
                                                alt={`фото ${index + 1}`}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <div>
                                    <h3 style={{
                                        height: '160px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        background: '#364d79',
                                    }}>Без зображень!</h3>
                                </div>
                            )
                        }
                    >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Ціна: {product.price}</p>
                        <p>Кількість: {product.quantity}</p>
                        <p>Категорія: {product.category && product.category.name}</p>

                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
