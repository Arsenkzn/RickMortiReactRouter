import React, { FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Item } from '../components/Item'

interface Props {
    category: string;
    pageNumber: number;
}
// interface Item {
//     id: number;
//     name: string;
//     image?: string;
//     //и другие свойства
// }

const CategoryPage: FC<Props> = ({ category, pageNumber }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const getApiUrl = (category: string): string => {
        switch (category) {
            case 'characters':
                return 'https://rickandmortyapi.com/api/character';
            case 'location':
                return 'https://rickandmortyapi.com/api/location';
            case 'episode':
                return 'https://rickandmortyapi.com/api/episode';
            default:
                return ''; 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const apiUrl = getApiUrl(category);

            if (!apiUrl) {
                setError('Invalid category');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(apiUrl, {
                    params: { page: pageNumber },
                });
                console.log(response.data.results);
                setItems(response.data.results);
            } catch (e: any) {
                if (axios.isCancel(e)) {
                    return;
                }
                setError(e.message || 'Failed to fetch data');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [category, pageNumber]);

    const renderItemDetails = (item: Item) => {
        return Object.entries(item)
            .filter(([key, _]) => key !== 'image')
            .map(([key, value]) => {
                if (value === null || value === undefined || value === '') return null;
    
                if (key === 'episode' || key === 'residents' || key === 'characters' && Array.isArray(value)) {
                    return value.map((episodeUrl, index) => (
                        <p key={`episode-${index}`}>
                            <strong>{key} {index + 1}:</strong> {episodeUrl}
                        </p>
                    ));
                }
    
                return (
                    <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                    </p>
                );
            });
    };

    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                {items.map((item) => (
                    <div key={item.id} className='item'>
                        <h3>{item.name}</h3>
                        {item.image && <img src={item.image} alt={item.name} />}
                        {renderItemDetails(item)}
                     <Link to={`/${category}/${item.id}`}>Подробнее</Link>
                        <hr />
                        <br />
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;


