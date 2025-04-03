import React, { FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import locations from '../data/locations.json';
import episodes from '../data/episodes.json';
import { Item } from '../components/Item'

interface Props {
    category: string;
}

const CategoryPage: FC<Props> = ({ category }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        switch(category){
            case 'characters':
            setItems(characters);
            break;
            case 'location':
            setItems(locations);
            break;
            case 'episode':
            setItems(episodes);
            break;
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