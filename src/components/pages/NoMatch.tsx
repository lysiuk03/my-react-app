import React from "react";
import { Button, Result } from 'antd';
// Оголошення функціонального компоненту NoMatch
const NoMatch: React.FC = () => {
    // Вивід компоненту Result для відображення повідомлення про помилку 404
    return (
        <Result
            status="404"
            title="404"
            subTitle="Вибачте, дану сторінку не знайдено."
            extra={<Button type="primary">Повернутися до хати</Button>}
        />
    );
}
// Експорт компоненту NoMatch для використання в інших частинах програми
export default NoMatch;