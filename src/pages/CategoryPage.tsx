import React, { FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import locations from '../data/locations.json';
import episodes from '../data/episodes.json';

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

const CategoryPage: FC<Props> = ({ category }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        if (category === 'characters') {
            setItems(characters);
        } else if (category === 'location') {
            setItems(locations);
        } else if (category === 'episode') {
            setItems(episodes);
        }
    }, [category]);

    const renderItemDetails = (item: Item) => {
        return Object.entries(item)
            .filter(([key, _]) => key !== 'image')
            .map(([key, value]) => {
                if (!value) return null;
                return (
                    <p key={key}>
                        <strong>{key}:</strong> {value}
                    </p>
                );
            });
    };

    return (
        <>
            <h1>{category}</h1>
            {items.map((item) => (
                <div key={item.id} className="item">
                    {renderItemDetails(item)}
                    {item.image && <img src={item.image} alt={item.name || 'Изображение'} />}
                    <br />
                    <Link to={`/${category}/${item.id}`}>Подробнее</Link>
                </div>
            ))}
        </>
    );
};

export default CategoryPage;