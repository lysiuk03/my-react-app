//@ts-ignore
import React, { useState } from "react";
import { Button, Divider, Form, Input, Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProductCreatePage = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            //@ts-ignore
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("category_id", values.category_id);
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("quantity", values.quantity);
            formData.append("description", values.description);

            fileList.forEach((file, index) => {
                // @ts-ignore
                formData.append(`images[${index}]`, file.originFileObj);
            });

            const apiUrl = "http://spu111.api.com/api/product/create";

            // Perform the API call
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Product created successfully!");
                message.success("Product created successfully!");
            } else {
                console.error("Failed to create product");
                message.error("Failed to create product");
            }
        } catch (error) {
            console.error("Error:", error);
            message.error("Failed to create product");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Divider>Додати продукт</Divider>
            <Form
                name="basic"
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Категорія ID" name="category_id">
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Назва" name="name" rules={[{ required: true, message: "Вкажіть назву категорії!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Ціна" name="price" rules={[{ required: true, message: "Вкажіть ціну!" }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Кількість" name="quantity" rules={[{ required: true, message: "Вкажіть кількість!" }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Опис" name="description" rules={[{ required: true, message: "Вкажіть опис!" }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Фото" name="images">
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        onPreview={handlePreview}
                        onChange={handleChange}
                        accept="image/*"
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: "100%" }} src={previewImage} />
                    </Modal>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ProductCreatePage;
