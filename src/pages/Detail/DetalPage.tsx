import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchItemDetails from '../../features/search/useFetchItemDetails';

interface Props {
    category: string;
}

const DetailPage: FC<Props> = ({ category }) => {
    const { id } = useParams();
    const { loading, error, item } = useFetchItemDetails(category, id || '');

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка при загрузке данных: {error.message}</div>;
    }

    if (!item) {
        return <div>Элемент не найден.</div>;
    }

    return (
        <div>
             <h1>{item.name || item.title}</h1>
             {Object.entries(item).filter(([key, _]) => key !== 'image' && key!== 'episode' && key !== 'residents' && key !== 'characters').map(([key, value]) => (<div key={key}>
                     <strong>{key}:</strong> {String(value)}
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

// import React, { FC, useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Item } from '../components/Item'
// import useSearch2 from '../hooks/useSearch2';

// interface Props {
//     category: string;
// }

// const DetailPage: FC<Props> = ({ category }) => {
//    // const [item, setItem] = useState<Item | null>(null);
//     const { id } = useParams();
//         const {
//             loading,
//             error,
//             character,
//         } = useSearch2(category);
    
//         // useEffect(() => {
//         //     if (character && id) {
//         //         const foundItem = character.find((char: any) => char.id === parseInt(id));
//         //         setItem(foundItem || null);
//         //     }
//         // }, [character, id]);
//         const item = character?.find((char: any) => char.id === parseInt(id));
    
//         if (loading) {
//             return <div>Загрузка...</div>;
//         }
    
//         if (error) {
//             return <div>Ошибка при загрузке данных.</div>;
//         }

    
//         if (!item) {
//             return <div>Элемент не найден.</div>;
//         }

//     return (
//         <div>
//             <h1>{item.name || item.title}</h1>
//             {Object.entries(item).filter(([key, _]) => key !== 'image').map(([key, value]) => (<div key={key}>
//                     <strong>{key}:</strong> {String(value)}
//                 </div>
//             ))}
//             <br />
//             {item.image && <img src={item.image} alt={item.name ? `${item.name} Изображение` : ''} />}
//             <br />
//             <Link to={`/${category}`}>Вернуться к {category}</Link>
//         </div>
//     );
// };

// export default DetailPage;