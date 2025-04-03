import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import characters from '../data/characters.json';
import episodes from '../data/episodes.json';
import locations from '../data/locations.json';

interface Item {
    id: number;
    name?: string;
    title?: string;
    status?: string;
    type?: string;
    gender?: string;
    created?: number;
    image?: string;
}

interface Props {
    category: string;
}

const DetailPage: FC<Props> = ({ category }) => {
    const [item, setItem] = useState<Item | null>(null);
    const { id } = useParams();
    useEffect(() => {
        let items: Item[];
        switch (category) {
            case 'characters':
                items = characters;
                break;
            case 'locations':
                items = locations;
                break;
            case 'episodes':
                items = episodes;
                break;
            default:
                throw new Error(`Неизвестная категория: ${category}`);
        }

        const foundItem = items.find(item => item.id === +id);
        if (foundItem) {
            setItem(foundItem);
        }
    }, [id, category]);

    if (!item) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>{item.name || item.title}</h1>
            {Object.entries(item).filter(([key, _]) => key !== 'image').map(([key, value]) => (<div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ))}
            <br />
            {item.image && <img src={item.image} alt={item.name ? `${item.name} Изображение` : ''} />}
            <br />
            <Link to={`/${category}`}>Вернуться к {category}</Link>
        </div>
    );
};

export default DetailPage;