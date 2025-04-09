import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../entities/Item'; 
import useSearch2 from '../../features/search/useSearch2';


interface Props {
    category: string;
}

export default function CategoryPage2({ category }: Props) {

    const [pageNumber, setPageNumber] = useState<number>(1);

    const {
        loading,
        error,
        character,
        hasMore,
    } = useSearch2(category, pageNumber);


    const observer = useRef<IntersectionObserver>();

    const lastItemElementRef = useCallback((node: HTMLDivElement | null) => {
            if (loading) return; 

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, hasMore]
    );

    const renderItemDetails = (item: Item) => {
        return (
            <div>
                <p>ID: {item.id}</p>
                <p>Name: {item.name}</p>
                {item.type && <p>Type: {item.type}</p>}
                {item.dimension && <p>Dimension: {item.dimension}</p>}
                {item.air_date && <p>Air_date: {item.air_date}</p>}
                {item.status && <p>Status: {item.status}</p>}
                {item.species && <p>Species: {item.species}</p>}
                {item.gender && <p>Gender: {item.gender}</p>}
            </div>
        );
    };

    useEffect(() => {
        setPageNumber(1);
    }, [category]);

    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            <div>
                {character.map((item, index) => {
                    const isLastItem = character.length === index + 1;
                    
                    return (
                        <div key={item.id} className="item" ref={isLastItem ? lastItemElementRef : undefined}>
                            <h3>{item.name}</h3>
                            {item.image && <img src={item.image} alt={item.name} />}
                            {renderItemDetails(item)} 
                            <Link to={`/${category}/${item.id}`}>Подробнее</Link>
                            <hr />
                            <br />
                            <br />
                        </div>
                    );
                })}
                {loading && <p>Загрузка...</p>}
                {error && <p>Ошибка: {error.message}</p>}
            </div>
        </div>
    );
}

