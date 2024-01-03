// Імпорт компонентів та хуків з бібліотеки Ant Design для роботи з формами та завантаженням файлів
import {Button, Divider, Form, Input, Upload, message, Alert} from "antd";
// Імпорт хука для навігації між сторінками
import {useNavigate} from "react-router-dom";
// Імпорт хука для роботи зі станом компонента
import {useState} from "react";
// Імпорт іконок для відображення при завантаженні та завершенні завантаження файлу
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
// Імпорт типів для компонентів Ant Design пов'язаних з завантаженням файлів
import type {UploadChangeParam} from 'antd/es/upload';
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
// Імпорт інтерфейсу для представлення даних про категорію при створенні
import {ICategoryCreate} from "./types.ts";
// Імпорт екземпляру Axios для виконання HTTP-запитів
import http_common from "../../../http_common.ts";

const CategoryCreatePage = () => {
    // Ініціалізація хука для навігації в реакті
    const navigate = useNavigate();
    // Ініціалізація стану для зберігання обраного файлу
    const [file, setFile] = useState<File | null>(null);
    // Ініціалізація стану для зберігання повідомлення про помилку
    const [errorMessage, setErrorMessage] = useState<string>("");
    // Ініціалізація стану для відображення статусу завантаження
    const [loading, setLoading] = useState(false);


    // Обробник події при успішному відправленні форми
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log('file:', file);
        if(file==null) {
            setErrorMessage("Оберіть фото!");
            return;
        }
        // Створення об'єкта моделі для відправки на сервер
        const model : ICategoryCreate = {
            name: values.name,
            image: file
        };
        try {
            // Відправлення запиту на створення категорії за допомогою HTTP-клієнта
            await http_common.post("/api/categories/create", model,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/");
        }
        catch (ex) {
            message.error('Помилка створення категорії!');
        }
    }

    // Обробник події при неуспішному відправленні форми
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // Оголошення типу для полів форми
    type FieldType = {
        name?: string;
    };

    // Визначення стилю для роздільника
    const customDividerStyle = {
        borderTop: '2px solid #1890ff',
        margin: '5px 0 50px 0',
    };


    // Обробник події зміни файлу при завантаженні
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const file = info.file.originFileObj as File;
            setLoading(false);
            setFile(file);
            setErrorMessage("");
        }
    };

    // Визначення вигляду кнопки завантаження файлу
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    // Перевірка перед завантаженням файлу (тип та розмір)
    const beforeUpload = (file: RcFile) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage) {
            message.error('Оберіть файл зображення!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Розмір файлу не повинен перевищувать 10MB!');
        }
        console.log("is select", isImage && isLt2M);
        return isImage && isLt2M;
    };

    // Відображення компоненту форми та завантаження файлу
    return (
        <>
            {/* Вивід роздільника з вказаним стилем */}
            <Divider style={customDividerStyle}>Додати категорію</Divider>
            {errorMessage && <Alert message={errorMessage} style={{marginBottom: "20px"}} type="error" />}
            <Form
                name="basic"
                style={{maxWidth: 1000}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Назва"
                    name="name"
                    rules={[{required: true, message: 'Вкажіть назву категорії!'}]}
                >
                    <Input/>
                </Form.Item>


                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    accept={"image/*"}
                >
                    {file ? <img src={URL.createObjectURL(file)} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                </Upload>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

// Експорт компоненту CategoryCreatePage для використання в інших частинах програми
export default CategoryCreatePage;